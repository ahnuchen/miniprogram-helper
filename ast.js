const fs = require('fs-extra')

const astMap = {
    'wx:if=': 'a:if=',
    'wx:elif=': 'a:elif=',
    'wx:else': 'a:else',
    'wx:for-index=': 'a:for-index=',
    'wx:key=': 'a:key=',
    'wx:for-item=': 'a:for-item=',
    'wx:for=': 'a:for=',
    '<wxs module=': '<import-sjs name=',
    '<wxs src=': '<import-sjs from=',
    '</wxs>': '</import-sjs>',
    '.wxs"': '.sjs"',
    '.wxml"': '.axml"',
    'module="': 'name="',
    'bindtap=': 'onTap=',
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
    astMapReg[key] = new RegExp(key, 'gi')
})
const transForm = text => {
    astMapKeys.forEach(key => {
        if (text.includes(key)) {
            text = text.replace(astMapReg[key], astMap[key])
        }
    })
    return text
}

const reg = new RegExp(`([1-9]\\d*\\.\\d*)rem|(0\\.\\d*[1-9]\\d*)rem|(\\d*)rem`, 'gi')
function calcRem(file){
    let a = reg.exec(file);
    while (a) {
        let str = a[0]
        let index = a['index']
        let replacedIndex = str.replace('rem', '')
        let completedRem = replacedIndex * 1 / 2.5
        file = file.slice(0, index) + completedRem + 'rem' + file.slice(index + str.length, file.length)
        a = reg.exec(file)
    }
    return file
}

const transFormFileContent = filePath => {
    let fileContent = fs.readFileSync(filePath).toString()
    if (filePath.endsWith('.axml')) {
        fs.unlinkSync(filePath)
        fs.writeFileSync(filePath, transForm(fileContent))
    }
    if (filePath.endsWith('.acss')) {
        fs.unlinkSync(filePath)
        fs.writeFileSync(filePath, calcRem(fileContent))
    }
}

module.exports = {
    transFormFileContent
}