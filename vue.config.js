const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)
const { getSass } = require('@zougt/some-loader-utils');
const ThemeCssExtractWebpackPlugin = require('@zougt/theme-css-extract-webpack-plugin');
const multipleScopeVars = [
    {
        scopeName: 'light',
        name: '浅色',
        path: 'src/theme/light.scss',
    },
    {
        scopeName: 'dark',
        name: '黑色',
        path: 'src/theme/dark.scss',
    },
]
module.exports = {
    publicPath: '/',//publicPath取代了baseUrl
    outputDir: 'dist',
    lintOnSave: true,
    runtimeCompiler: true,
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        resolve: {
            alias: {
                '@': resolve('src')
            }
        },
        output: {
            // path:"/webapp/",
            // 把子应用打包成 umd 库格式
            library: `oa`,
            libraryTarget: 'umd',
            jsonpFunction: `webpackJsonp_${__dirname}`,
        }
    },
    css: {
        loaderOptions: {
            scss: {
                // 这里的选项会传递给 sass-loader
                implementation: getSass({
                    // getMultipleScopeVars优先于 sassOptions.multipleScopeVars
                    getMultipleScopeVars: () => multipleScopeVars.map((item) => {
                        return { ...item, path: path.resolve(item.path) };
                    }),
                }),
            },
        },
    },
    chainWebpack: (config) => {
        config
            .plugin('ThemeCssExtractWebpackPlugin')
            .use(ThemeCssExtractWebpackPlugin, [
                {
                    multipleScopeVars,
                    extract: process.env.NODE_ENV === 'production',
                    // extract: false,
                },
            ]);
    },
    devServer: {
        port: 8088, // 启动端口号
        open: false,  // 启动后是否自动打开网页
        headers: {
            'Access-Control-Allow-Origin': '*',//重要 允许任何人的访问配置
        },
        proxy: {
            '/gic_ddosIp_v1': {
                // target: 'http://10.131.80.122:8002/',
                target: 'http://anti-ddos-font.gic.pre/',
                // target: 'https://anti-ddos.capitalonline.net/',
                changeOrigin: true,
                pathRewrite:{
                    '^/gic_ddosIp_v1': ''
                }
            },
            '/gic_ddosIp': {
                target: 'http://control.gic.pre/',
                // target: 'http://console.capitalonline.net/',
                changeOrigin: true,
                pathRewrite:{
                    '^/gic_ddosIp': ''
                }
            },
            '/gicend/': {
                target: 'http://gic2panel.gic.pre/',
                changeOrigin: true,
            },
        },
    },

}
