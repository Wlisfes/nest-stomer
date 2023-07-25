<script lang="tsx">
import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue'
import { divineDelay, stop } from '@/utils/utils-common'
import { useState } from '@/hooks/hook-state'

export default defineComponent({
    name: 'CommonCaptcha',
    props: {
        canvasWidth: { type: Number, default: 310 }, // 主canvas的宽
        canvasHeight: { type: Number, default: 160 }, // 主canvas的高
        puzzleScale: { type: Number, default: 1 }, // 拼图块的大小缩放比例
        sliderSize: { type: Number, default: 50 }, // 滑块的大小
        range: { type: Number, default: 10 }, // 允许的偏差值
        cover: { type: Array, default: () => [] },
        successText: { type: String, default: '验证通过！' },
        failText: { type: String, default: '验证失败，请重试' },
        sliderText: { type: String, default: '拖动滑块完成拼图' }
    },
    emits: ['close', 'success', 'fail'],
    setup(props, { slots, emit }) {
        const canvas1 = ref<HTMLCanvasElement>()
        const canvas2 = ref<HTMLCanvasElement>()
        const canvas3 = ref<HTMLCanvasElement>()
        const slider = ref<HTMLDivElement>()
        const { state, setState } = useState({
            mouseDown: false, // 鼠标是否在按钮上按下
            startWidth: 50, // 鼠标点下去时父级的width
            startX: 0, // 鼠标按下时的X
            newX: 0, // 鼠标当前的偏移X
            pinX: 0, // 拼图的起始X
            pinY: 0, // 拼图的起始Y
            loading: false, // 是否正在加在中，主要是等图片onload
            isCanSlide: false, // 是否可以拉动滑动条
            error: false, // 图片加在失败会出现这个，提示用户手动刷新
            infoBoxShow: false, // 提示信息是否出现
            infoText: '', // 提示等信息
            infoBoxFail: false, // 是否验证失败
            timer1: null, // setTimout1
            closeDown: false, // 为了解决Mac上的click BUG
            isSuccess: false, // 验证成功
            imgIndex: -1, // 用于自定义图片时不会随机到重复的图片
            isSubmting: false // 是否正在判定，主要用于判定中不能点击重置按钮
        })

        //处理一下sliderSize，弄成整数，以免计算有偏差
        const sliderBaseSize = computed(() => {
            return Math.max(Math.min(Math.round(props.sliderSize), Math.round(props.canvasWidth * 0.5)), 10)
        })
        //styleWidth是底部用户操作的滑块的父级，就是轨道在鼠标的作用下应该具有的宽度
        const styleWidth = computed(() => {
            const w = state.startWidth + state.newX - state.startX
            return w < sliderBaseSize.value ? sliderBaseSize.value : w > props.canvasWidth ? props.canvasWidth : w
        })
        //图中拼图块的60 * 用户设定的缩放比例计算之后的值 0.2~2
        const puzzleBaseSize = computed(() => {
            return Math.round(Math.max(Math.min(props.puzzleScale, 2), 0.2) * 52.5 + 6)
        })
        const translateX = computed(() => {
            const v1 = styleWidth.value - sliderBaseSize.value
            const v2 = puzzleBaseSize.value - sliderBaseSize.value
            const v3 = styleWidth.value - sliderBaseSize.value
            const v4 = props.canvasWidth - sliderBaseSize.value
            return `translateX(${v1 - v2 * (v3 / v4)}px)`
        })
        const flashTranslateX = computed(() => {
            const v3 = state.isSuccess ? `${props.canvasWidth + props.canvasHeight * 0.578}px` : `-${props.canvasHeight * 0.578}px`
            return `translateX(${v3}) skew(-30deg, 0)`
        })

        onMounted(() => {
            document.addEventListener('mousemove', onRangeMouseMove, false)
            document.addEventListener('mouseup', onRangeMouseUp, false)
            document.addEventListener('touchmove', onRangeMouseMove, { passive: false })
            document.addEventListener('touchend', onRangeMouseUp, false)
            reset()
        })

        onUnmounted(() => {
            document.removeEventListener('mousemove', onRangeMouseMove, false)
            document.removeEventListener('mouseup', onRangeMouseUp, false)
            document.removeEventListener('touchmove', onRangeMouseMove)
            document.removeEventListener('touchend', onRangeMouseUp, false)
        })

        /**鼠标按下准备拖动**/
        function onRangeMouseDown(e: MouseEvent | TouchEvent) {
            if (state.isCanSlide) {
                setState({
                    mouseDown: true,
                    startWidth: (slider.value as HTMLDivElement).clientWidth,
                    newX: e instanceof MouseEvent ? e.clientX : e.changedTouches[0].clientX,
                    startX: e instanceof MouseEvent ? e.clientX : e.changedTouches[0].clientX
                })
            }
        }

        /**鼠标移动**/
        function onRangeMouseMove(e: MouseEvent | TouchEvent) {
            if (state.mouseDown) {
                e.preventDefault()
                setState({ newX: e instanceof MouseEvent ? e.clientX : e.changedTouches[0].clientX })
            }
        }

        /**鼠标抬起**/
        function onRangeMouseUp() {
            if (state.mouseDown) {
                setState({ mouseDown: false }).finally(() => {
                    submit()
                })
            }
        }

        /**重置-重新设置初始状态**/
        async function resetState() {
            return await setState({
                infoBoxFail: false,
                infoBoxShow: false,
                isCanSlide: false,
                isSuccess: false,
                startWidth: sliderBaseSize.value, // 鼠标点下去时父级的width
                startX: 0, // 鼠标按下时的X
                newX: 0 // 鼠标当前的偏移X
            })
        }

        /**重置**/
        function reset() {
            if (state.isSubmting) {
                return false
            }
            return resetState().then(() => {
                return initCaptcha()
            })
        }

        /**工具 - 范围随机数**/
        function getRandom(min: number, max: number) {
            return Math.ceil(Math.random() * (max - min) + min)
        }

        /**工具 - 设置图片尺寸cover方式贴合canvas尺寸 w/h**/
        function makeImgSize(image: HTMLImageElement) {
            const imgScale = image.width / image.height
            const canvasScale = props.canvasWidth / props.canvasHeight
            let x = 0,
                y = 0,
                w = 0,
                h = 0
            if (imgScale > canvasScale) {
                h = props.canvasHeight
                w = imgScale * h
                y = 0
                x = (props.canvasWidth - w) / 2
            } else {
                w = props.canvasWidth
                h = w / imgScale
                x = 0
                y = (props.canvasHeight - h) / 2
            }
            return [x, y, w, h]
        }

        /**绘制拼图块的路径**/
        function paintBrick(ctx: CanvasRenderingContext2D) {
            const moveL = Math.ceil(15 * props.puzzleScale) // 直线移动的基础距离
            ctx.beginPath()
            ctx.moveTo(state.pinX, state.pinY)
            ctx.lineTo(state.pinX + moveL, state.pinY)
            ctx.arcTo(state.pinX + moveL, state.pinY - moveL / 2, state.pinX + moveL + moveL / 2, state.pinY - moveL / 2, moveL / 2)
            ctx.arcTo(state.pinX + moveL + moveL, state.pinY - moveL / 2, state.pinX + moveL + moveL, state.pinY, moveL / 2)
            ctx.lineTo(state.pinX + moveL + moveL + moveL, state.pinY)
            ctx.lineTo(state.pinX + moveL + moveL + moveL, state.pinY + moveL)
            ctx.arcTo(
                state.pinX + moveL + moveL + moveL + moveL / 2,
                state.pinY + moveL,
                state.pinX + moveL + moveL + moveL + moveL / 2,
                state.pinY + moveL + moveL / 2,
                moveL / 2
            )
            ctx.arcTo(
                state.pinX + moveL + moveL + moveL + moveL / 2,
                state.pinY + moveL + moveL,
                state.pinX + moveL + moveL + moveL,
                state.pinY + moveL + moveL,
                moveL / 2
            )
            ctx.lineTo(state.pinX + moveL + moveL + moveL, state.pinY + moveL + moveL + moveL)
            ctx.lineTo(state.pinX, state.pinY + moveL + moveL + moveL)
            ctx.lineTo(state.pinX, state.pinY + moveL + moveL)

            ctx.arcTo(state.pinX + moveL / 2, state.pinY + moveL + moveL, state.pinX + moveL / 2, state.pinY + moveL + moveL / 2, moveL / 2)
            ctx.arcTo(state.pinX + moveL / 2, state.pinY + moveL, state.pinX, state.pinY + moveL, moveL / 2)
            ctx.lineTo(state.pinX, state.pinY)
        }

        /**用canvas随机生成图片**/
        function makeImgWithCanvas() {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
            canvas.width = props.canvasWidth
            canvas.height = props.canvasHeight
            ctx.fillStyle = `rgb(${getRandom(100, 255)},${getRandom(100, 255)},${getRandom(100, 255)})`
            ctx.fillRect(0, 0, props.canvasWidth, props.canvasHeight)
            // 随机画10个图形
            for (let i = 0; i < 12; i++) {
                ctx.fillStyle = `rgb(${getRandom(100, 255)},${getRandom(100, 255)},${getRandom(100, 255)})`
                ctx.strokeStyle = `rgb(${getRandom(100, 255)},${getRandom(100, 255)},${getRandom(100, 255)})`

                if (getRandom(0, 2) > 1) {
                    // 矩形
                    ctx.save()
                    ctx.rotate((getRandom(-90, 90) * Math.PI) / 180)
                    ctx.fillRect(
                        getRandom(-20, canvas.width - 20),
                        getRandom(-20, canvas.height - 20),
                        getRandom(10, canvas.width / 2 + 10),
                        getRandom(10, canvas.height / 2 + 10)
                    )
                    ctx.restore()
                } else {
                    // 圆
                    ctx.beginPath()
                    const ran = getRandom(-Math.PI, Math.PI)
                    ctx.arc(
                        getRandom(0, canvas.width),
                        getRandom(0, canvas.height),
                        getRandom(10, canvas.height / 2 + 10),
                        ran,
                        ran + Math.PI * 1.5
                    )
                    ctx.closePath()
                    ctx.fill()
                }
            }
            return canvas.toDataURL('image/png')
        }

        /**初始化**/
        function initCaptcha(withCanvas: boolean = false) {
            //防止重复加载导致的渲染错误
            if (state.loading && !withCanvas) {
                return false
            }
            setState({ loading: true, isCanSlide: false }).then(async () => {
                const ctx = canvas1.value?.getContext('2d') as CanvasRenderingContext2D
                const ctx2 = canvas2.value?.getContext('2d') as CanvasRenderingContext2D
                const ctx3 = canvas3.value?.getContext('2d') as CanvasRenderingContext2D
                const isFirefox = navigator.userAgent.indexOf('Firefox') >= 0 && navigator.userAgent.indexOf('Windows') >= 0 // 是windows版火狐
                const image = document.createElement('img')
                ctx.fillStyle = 'rgba(255,255,255,1)'
                ctx3.fillStyle = 'rgba(255,255,255,1)'
                ctx.clearRect(0, 0, props.canvasWidth, props.canvasHeight)
                ctx2.clearRect(0, 0, props.canvasWidth, props.canvasHeight)
                /**匿名，想要获取跨域的图片**/
                image.crossOrigin = 'anonymous'
                /**取一个随机坐标，作为拼图块的位置**/
                await setState({
                    pinX: getRandom(puzzleBaseSize.value, props.canvasWidth - puzzleBaseSize.value - 20), //留20的边距
                    pinY: getRandom(20, props.canvasHeight - puzzleBaseSize.value - 20) //主图高度 - 拼图块自身高度 - 20边距
                })
                image.onload = async () => {
                    const [x, y, w, h] = makeImgSize(image)
                    ctx.save()
                    //先画小图
                    paintBrick(ctx)
                    ctx.closePath()
                    if (!isFirefox) {
                        ctx.shadowOffsetX = 0
                        ctx.shadowOffsetY = 0
                        ctx.shadowColor = '#000'
                        ctx.shadowBlur = 3
                        ctx.fill()
                        ctx.clip()
                    } else {
                        ctx.clip()
                        ctx.save()
                        ctx.shadowOffsetX = 0
                        ctx.shadowOffsetY = 0
                        ctx.shadowColor = '#000'
                        ctx.shadowBlur = 3
                        ctx.fill()
                        ctx.restore()
                    }
                    ctx.drawImage(image, x, y, w, h)
                    ctx3.fillRect(0, 0, props.canvasWidth, props.canvasHeight)
                    ctx3.drawImage(image, x, y, w, h)

                    // 设置小图的内阴影
                    ctx.globalCompositeOperation = 'source-atop'
                    paintBrick(ctx)
                    ctx.arc(
                        state.pinX + Math.ceil(puzzleBaseSize.value / 2),
                        state.pinY + Math.ceil(puzzleBaseSize.value / 2),
                        puzzleBaseSize.value * 1.2,
                        0,
                        Math.PI * 2,
                        true
                    )
                    ctx.closePath()
                    ctx.shadowColor = 'rgba(255, 255, 255, .8)'
                    ctx.shadowOffsetX = -1
                    ctx.shadowOffsetY = -1
                    ctx.shadowBlur = Math.min(Math.ceil(8 * props.puzzleScale), 12)
                    ctx.fillStyle = '#ffffaa'
                    ctx.fill()
                    // 将小图赋值给ctx2
                    const imgData = ctx.getImageData(
                        state.pinX - 3, //为了阴影 是从-3px开始截取，判定的时候要+3px
                        state.pinY - 20,
                        state.pinX + puzzleBaseSize.value + 5,
                        state.pinY + puzzleBaseSize.value + 5
                    )
                    ctx2.putImageData(imgData, 0, state.pinY - 20)
                    //清理
                    ctx.restore()
                    ctx.clearRect(0, 0, props.canvasWidth, props.canvasHeight)
                    // 画缺口
                    ctx.save()
                    paintBrick(ctx)
                    ctx.globalAlpha = 0.8
                    ctx.fillStyle = '#ffffff'
                    ctx.fill()
                    ctx.restore()
                    // 画缺口的内阴影
                    ctx.save()
                    ctx.globalCompositeOperation = 'source-atop'
                    paintBrick(ctx)
                    ctx.arc(
                        state.pinX + Math.ceil(puzzleBaseSize.value / 2),
                        state.pinY + Math.ceil(puzzleBaseSize.value / 2),
                        puzzleBaseSize.value * 1.2,
                        0,
                        Math.PI * 2,
                        true
                    )
                    ctx.shadowColor = '#000'
                    ctx.shadowOffsetX = 2
                    ctx.shadowOffsetY = 2
                    ctx.shadowBlur = 16
                    ctx.fill()
                    ctx.restore()
                    // 画整体背景图
                    ctx.save()
                    ctx.globalCompositeOperation = 'destination-over'
                    ctx.drawImage(image, x, y, w, h)
                    ctx.restore()
                    await setState({ loading: false, isCanSlide: true })
                }

                /**如果图片加载错误就重新来，并强制用canvas随机作图**/
                image.onerror = () => {
                    initCaptcha(true)
                }

                if (!withCanvas && props.cover && props.cover.length) {
                    let randomNum = getRandom(0, props.cover.length - 1)
                    if (randomNum === state.imgIndex) {
                        if (randomNum === props.cover.length - 1) {
                            randomNum = 0
                        } else {
                            randomNum++
                        }
                    }
                    setState({ imgIndex: randomNum }).finally(() => {
                        image.src = props.cover[randomNum] as string
                    })
                } else {
                    image.src = makeImgWithCanvas()
                }
            })
        }

        /**开始判定**/
        function submit() {
            setState({ isSubmting: true }).then(async () => {
                // 偏差 x = puzzle的起始X - (用户真滑动的距离) + (puzzle的宽度 - 滑块的宽度) * （用户真滑动的距离/canvas总宽度）
                // 最后+ 的是补上slider和滑块宽度不一致造成的缝隙
                const x = Math.abs(
                    state.pinX -
                        (styleWidth.value - sliderBaseSize.value) +
                        (puzzleBaseSize.value - sliderBaseSize.value) *
                            ((styleWidth.value - sliderBaseSize.value) / (props.canvasWidth - sliderBaseSize.value)) -
                        3
                )
                if (x < props.range) {
                    //成功
                    await setState({
                        infoText: props.successText,
                        infoBoxFail: false,
                        infoBoxShow: true,
                        isCanSlide: false,
                        isSuccess: true
                    })
                    await divineDelay(800)
                    setState({ isSubmting: false }).finally(() => {
                        emit('success', x)
                    })
                } else {
                    //失败
                    await setState({
                        infoText: props.failText,
                        infoBoxFail: true,
                        infoBoxShow: true,
                        isCanSlide: false
                    })
                    await divineDelay(800, () => emit('fail', x)).then(async () => {
                        await setState({ isSubmting: false })
                        reset()
                    })
                }
            })
        }

        return () => (
            <n-el tag="div" class="common-captcha">
                <div class="common-captcha__container" onMousedown={e => e.stopPropagation()} onTouchstart={e => e.stopPropagation()}>
                    <div class="common-captcha__context" style={{ height: props.canvasHeight + 'px' }}>
                        <canvas
                            ref={canvas1}
                            width={props.canvasWidth}
                            height={props.canvasHeight}
                            style={{ width: props.canvasWidth + 'px', height: props.canvasHeight + 'px' }}
                        />
                        <canvas
                            ref={canvas3}
                            class={{ 'auth-canvas3': true, 'is-show': state.isSuccess }}
                            width={props.canvasWidth}
                            height={props.canvasHeight}
                            style={{ width: props.canvasWidth + 'px', height: props.canvasHeight + 'px' }}
                        />
                        <canvas
                            ref={canvas2}
                            class="auth-canvas2"
                            width={puzzleBaseSize.value}
                            height={props.canvasHeight}
                            style={{ width: puzzleBaseSize.value + 'px', height: props.canvasHeight + 'px', transform: translateX.value }}
                        />
                        <div class={{ 'auth-loading': true, 'is-hide': !state.loading }}>
                            <div class="auth-loading__spin">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <div class={{ 'auth-info': true, 'is-show': state.infoBoxShow, 'is-fail': state.infoBoxFail }}>
                            {state.infoText}
                        </div>
                        <div class={{ 'auth-flash': true, 'is-show': state.isSuccess }} style={{ transform: flashTranslateX.value }}></div>
                    </div>
                    <div class="common-captcha__control">
                        <div class="range-control" style={{ height: sliderBaseSize.value + 'px' }}>
                            <div class="range-control__placeholder">{props.sliderText}</div>
                            <div ref={slider} class="range-control__slider" style={{ width: styleWidth.value + 'px' }}>
                                <div
                                    class={{ 'range-control__button': true, 'is-down': state.mouseDown }}
                                    onMousedown={onRangeMouseDown}
                                    onTouchstart={onRangeMouseDown}
                                >
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </n-el>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-captcha {
    position: relative;
    &__container {
        padding: 20px;
        background: #fff;
        user-select: none;
        border-radius: 3px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        .auth-loading {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: 20;
            opacity: 1;
            transition: opacity 200ms;
            display: flex;
            align-items: center;
            justify-content: center;
            &.is-hide {
                opacity: 0;
                pointer-events: none;
                .auth-loading__spin {
                    span {
                        animation-play-state: paused;
                    }
                }
            }
            &__spin {
                flex: none;
                height: 5px;
                line-height: 0;
                @keyframes load {
                    0% {
                        opacity: 1;
                        transform: scale(1.3);
                    }
                    100% {
                        opacity: 0.2;
                        transform: scale(0.3);
                    }
                }
                span {
                    display: inline-block;
                    width: 5px;
                    height: 100%;
                    margin-left: 2px;
                    border-radius: 50%;
                    background-color: #888;
                    animation: load 1.04s ease infinite;
                    &:nth-child(1) {
                        margin-left: 0;
                    }
                    &:nth-child(2) {
                        animation-delay: 0.13s;
                    }
                    &:nth-child(3) {
                        animation-delay: 0.26s;
                    }
                    &:nth-child(4) {
                        animation-delay: 0.39s;
                    }
                    &:nth-child(5) {
                        animation-delay: 0.52s;
                    }
                }
            }
        }
        .auth-info {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 24px;
            line-height: 24px;
            text-align: center;
            overflow: hidden;
            font-size: 13px;
            background-color: #83ce3f;
            opacity: 0;
            transform: translateY(24px);
            transition: all 200ms;
            color: #fff;
            z-index: 10;
            &.is-show {
                opacity: 0.95;
                transform: translateY(0);
            }
            &.is-fail {
                background-color: #ce594b;
            }
        }
        .auth-flash {
            position: absolute;
            top: 0;
            left: 0;
            width: 30px;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.1);
            z-index: 3;
            &.is-show {
                transition: transform 600ms;
            }
        }
    }

    &__context {
        position: relative;
        overflow: hidden;
        border-radius: 3px;
        .auth-canvas2 {
            position: absolute;
            top: 0;
            left: 0;
            width: 60px;
            height: 100%;
            z-index: 2;
        }
        .auth-canvas3 {
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
            transition: opacity 600ms;
            z-index: 3;
            &.is-show {
                opacity: 1;
            }
        }
    }

    &__control {
        position: relative;
        .range-control {
            position: relative;
            width: 100%;
            background-color: #eef1f8;
            margin-top: 20px;
            border-radius: 3px;
            box-shadow: 0 0 8px rgba(240, 240, 240, 0.6) inset;
            &__placeholder {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 14px;
                line-height: 24px;
                color: #b7bcd1;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                text-align: center;
                width: 100%;
            }
            &__slider {
                position: absolute;
                height: 100%;
                width: 50px;
                background-color: rgba(106, 160, 255, 0.8);
                border-radius: 3px;
            }
            &__button {
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                right: 0;
                width: 50px;
                height: 100%;
                background-color: #fff;
                border-radius: 3px;
                box-shadow: 0 0 4px #ccc;
                cursor: pointer;
                & > div {
                    width: 0;
                    height: 40%;
                    transition: all 200ms;
                    &:nth-child(2) {
                        margin: 0 4px;
                    }
                    border: solid 1px #6aa0ff;
                }
                &:hover,
                &.is-down {
                    & > div:first-child {
                        border: solid 4px transparent;
                        height: 0;
                        border-right-color: #6aa0ff;
                    }
                    & > div:nth-child(2) {
                        border-width: 3px;
                        height: 0;
                        border-radius: 3px;
                        margin: 0 6px;
                        border-right-color: #6aa0ff;
                    }
                    & > div:nth-child(3) {
                        border: solid 4px transparent;
                        height: 0;
                        border-left-color: #6aa0ff;
                    }
                }
            }
        }
    }
}
</style>
