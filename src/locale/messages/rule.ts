export default {
    cn: {
        common: {
            name: '规则'
        },
        path: {
            value: '接口地址',
            placeholder: '请输入接口地址'
        },
        name: {
            value: '接口名称',
            placeholder: '请输入接口名称'
        },
        method: {
            value: '接口类型',
            placeholder: '请选择接口类型',
            column: [
                { label: 'GET', value: 'GET' },
                { label: 'POST', value: 'POST' },
                { label: 'PUT', value: 'PUT' },
                { label: 'DELETE', value: 'DELETE' }
            ]
        },
        parent: {
            value: '接口归属节点',
            placeholder: '请选择接口归属节点'
        }
    },
    en: {
        common: {
            name: 'Rule'
        },
        path: {
            value: 'Interface address',
            placeholder: 'Please enter the interface address'
        },
        name: {
            value: 'Interface name',
            placeholder: 'Please enter the interface name'
        },
        method: {
            value: 'Interface type',
            placeholder: 'Please select interface type',
            column: [
                { label: 'GET', value: 'GET' },
                { label: 'POST', value: 'POST' },
                { label: 'PUT', value: 'PUT' },
                { label: 'DELETE', value: 'DELETE' }
            ]
        },
        parent: {
            value: 'Interface home node',
            placeholder: 'Please select the node to which the interface belongs'
        }
    }
}
