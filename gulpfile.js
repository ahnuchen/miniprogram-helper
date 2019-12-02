const gulp = require('gulp');
const watch = require('gulp-watch');
const path = require('path')
const fs = require('fs-extra')
const {transFormFileContent} = require("./ast");

const config = {
    copyFileLog: true,
    resourceDir: path.join(__dirname, 'wechat-app/'),
    compileTargetDir: path.join(__dirname, 'ali-app/')
};

const utils = {
    copyFiles(filePath, isDir, resourceDir, compileTargetDir) {
        var subFilePath = filePath.replace(path.resolve(resourceDir), '')
        var copyTargetPath = utils.replaceTargetPath(path.join(path.resolve(compileTargetDir), subFilePath))
        if (isDir) {
            fs.ensureDirSync(copyTargetPath)
        } else {
            fs.ensureFile(copyTargetPath).then(copy)
        }
        if (config.copyFileLog) {
            console.info(`hot-reload-file：${filePath} \n`)
        }

        function copy() {
            fs.copyFileSync(path.resolve(filePath), copyTargetPath)
            transFormFileContent(copyTargetPath)
        }
    },
    replaceTargetPath(p) {
        const wxExtList = ['.wxss', '.wxml']
        const aliExtList = ['.acss', '.axml']
        wxExtList.forEach((ext, index) => {
            if (p.includes(ext)) {
                p = p.replace(ext, aliExtList[index])
            }
        })
        return p
    },
    build(resourceDir, compileTargetDir) {
        function readDir(rootPath) {
            const fileList = fs.readdirSync(rootPath)
            fileList.forEach(f => {
                let fPath = path.join(rootPath, f)
                let fisDir = !fs.statSync(fPath).isFile()
                utils.copyFiles(fPath, fisDir, resourceDir, compileTargetDir)
                if (fisDir) {
                    readDir(fPath)
                }
            })
        }

        readDir(resourceDir)
    }
};
/**
 * ================ 任务 =======================
 */
gulp.task('hot-reload', function () {
    return watch(config.resourceDir + '**', {events: ['add', 'change']}, function (file) {
        return utils.copyFiles(file.path, file.isDirectory(), config.resourceDir, config.compileTargetDir)
    })
})

gulp.task('build', function () {
    return utils.build(config.resourceDir, config.compileTargetDir)
})

/**
 *  =============== 运行 ======================
 */
// 打开web服务: gulp
gulp.task('default', ['hot-reload']);

