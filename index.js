/*
 * @Author: wangchao
 * @Date:   2016-08-24 20:17:17
 * Packed AMD File And Converts AMD Code To Standard JavaScript
 * @Last Modified by:   wangchao
 * @Last Modified time: 2016-08-25 10:20:59
 */
'use strict';
const amdclean = require('amdclean');
const childProcess = require('child_process');
const iconv = require('iconv-lite');
const fs = require('fs');
const uglifyJs = require('uglify-js');
module.exports = function(config) {
	/*入口主函数*/
	var main = (function() {
		var source = config.source.replace(/.js$/i, ''),
			baseUrl = source.substr(0, source.lastIndexOf('/')), //源文件目录
			baseMod = source.substr(source.lastIndexOf('/') + 1), //入口模块
			output = config.output; //输出文件

		//requirejs合并文件输出
		var exec = childProcess.exec,
			command = exec('r.js -o baseUrl=' + baseUrl + ' name=' + baseMod + ' out=' + output + ' optimize=none');

		//命令退出执行文件处理
		command.on('exit', function(code) {
			fs.readFile(output, function(err, data) {
				if (err)
					console.log("打包文件失败 " + err);
				else {
					//把数组转换为gbk中文  
					var content = iconv.decode(data, 'utf8');

					var ret = uglifyJs.minify(amdclean.clean(content), {
						fromString: true
					});

					//清理amd并写入文件
					fs.writeFile(output, ret.code, function(err) {
						if (err)
							console.log("清理AMD失败 " + err);
						else
							console.log("打包文件成功");
					});
				}
			});
		});
	})();
}