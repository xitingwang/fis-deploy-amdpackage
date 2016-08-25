# fis-deploy-amdpackage

Packed AMD File And Converts AMD Code To Standard JavaScript.
## use
```node
npm install --save fis-deploy-amdpackage
```

## settings
```javascript
//file : path/to/project/fis-conf.js
fis.match('src/**.js', {
	deploy: [
		fis.plugin('amdpackage', {
			source: './src/index.js',
			output: '../output/index.js'
		}),
		fis.plugin('local-deliver')
	]
});
```
