const gulp = require('gulp');
const watch = require('gulp-watch');
const path = require('path')
const fs = require('fs-extra')

const config = {
    copyFileLog: true,
    resourceDir: path.join(__dirname, 'wechat-app/'),
    compileTargetDir: path.join(__dirname, 'ali-app/')
};

const utils = {
    copyFiles(filePath, isDir, resourceDir, compileTargetDir) {
        var subFilePath = filePath.replace(path.resolve(resourceDir), '')
        var copyTargetPath = path.join(path.resolve(compileTargetDir), subFilePath)
        if (isDir) {
            fs.ensureDirSync(copyTargetPath)
        } else {
            fs.ensureFile(copyTargetPath).then(copy)
        }
        if (config.copyFileLog) {
            console.info(`hot-reload-file：${filePath} \n`)
        }

        function copy() {
            fs.copyFile(path.resolve(filePath), copyTargetPath, function (err, res) {
                if (err) {
                    console.error(err.message)
                }
            })
        }
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

/**
 *  =============== 运行 ======================
 */
// 打开web服务: gulp
gulp.task('default', ['hot-reload']);

