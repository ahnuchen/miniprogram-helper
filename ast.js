const fs = require('fs-extra')

const astMap = {
    'wx:if=': 'a:if=',
    'wx:elif=': 'a:elif=',
    'wx:else': 'a:else',
    'wx:for-index=': 'a:for-index=',
    'wx:key=': 'a:key=',
    'wx:for-item=': 'a:for-item=',
    'wx:for=': 'a:for=',
    'bindTap=': 'onTap=',
    'bindTouchstart=': 'onTouchstart=',
    'bindTouchmove=': 'onTouchmove=',
    'bindTouchcancel=': 'onTouchcancel=',
    'bindTouchend=': 'onTouchend=',
    'bindLongtap=': 'onLongtap=',
    'bindInput=': 'onInput=',
    'bindChange=': 'onChange=',
    'bindSubmit=': 'onSubmit=',
    'bindBlur=': 'onBlur=',
    'bindFocus=': 'onFocus=',
    'bindReset=': 'onReset=',
    'bindConfirm=': 'onConfirm=',
    'bindColumnchange=': 'onColumnchange=',
    'bindLinechange=': 'onLinechange=',
    'bindError=': 'onError=',
    'bindScrolltoupper=': 'onScrolltoupper=',
    'bindScrolltolower=': 'onScrolltolower=',
    'bindScroll=': 'onScroll=',
    'bindLoad=': 'onLoad=',
}

const astMapReg = {}
const astMapKeys = Object.keys(astMap)
astMapKeys.forEach(key => {
    astMapReg[key] = new RegExp(key, 'g')
})
const transForm = text => {
    astMapKeys.forEach(key => {
        if (text.includes(key)) {
            text = text.replace(astMapReg[key], astMap[key])
        }
    })
    return text
}

const transFormFileContent = filePath => {
    let fileContent = fs.readFileSync(filePath).toString()
    if (filePath.endsWith('.axml')) {
        fs.unlinkSync(filePath)
        fs.writeFileSync(filePath, transForm(fileContent))
    }
}

module.exports = {
    transFormFileContent
}