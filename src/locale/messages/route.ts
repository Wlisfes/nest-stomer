export default {
    namespace: 'route',
    cn: {
        title: {
            value: '菜单名称',
            placeholder: '请输入菜单名称'
        },
        icon: {
            value: '菜单图标',
            placeholder: '请选择菜单图标'
        },
        type: {
            value: '菜单类型',
            placeholder: '请选择菜单类型',
            column: [
                { label: '目录', value: 'directory' },
                { label: '菜单', value: 'menu' }
            ]
        },
        path: {
            value: '菜单路径',
            placeholder: '请输入菜单路径'
        },
        redirect: {
            value: '重定向地址',
            placeholder: '请输入重定向地址'
        },
        parent: {
            value: '上层节点',
            placeholder: '请选择上层节点'
        },
        status: {
            value: '菜单状态',
            placeholder: '请设置菜单状态'
        }
    },
    en: {
        title: {
            value: 'Menu name',
            placeholder: 'Please enter menu name'
        },
        icon: {
            value: 'Menu icon',
            placeholder: 'Please select menu icon'
        },
        type: {
            value: 'Menu type',
            placeholder: 'Please select menu type',
            column: [
                { label: 'Directory', value: 'directory' },
                { label: 'Menu', value: 'menu' }
            ]
        },
        path: {
            value: 'Menu path',
            placeholder: 'Please enter menu path'
        },
        redirect: {
            value: 'Redirect path',
            placeholder: 'Please enter redirect path'
        },
        parent: {
            value: 'Parent node',
            placeholder: 'Please enter parent node'
        },
        status: {
            value: 'Menu status',
            placeholder: 'Please set the menu status'
        }
    }
}
