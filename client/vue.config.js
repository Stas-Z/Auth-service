const webpack = require('webpack');
const { defineConfig } = require('@vue/cli-service');

function getApiUrl(mode, apiUrl) {
    if (apiUrl) {
        return apiUrl;
    }
    if (mode === 'production') {
        return '/api';
    }
    return 'http://localhost:5000';
}

module.exports = defineConfig(() => {
    const mode = process.env.NODE_ENV || 'development';
    const apiUrl = getApiUrl(mode, process.env.VUE_APP_API_URL);

    return {
        transpileDependencies: true,
        configureWebpack: {
            plugins: [
                new webpack.DefinePlugin({
                    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__:
                        JSON.stringify(false),
                    __API__: JSON.stringify(apiUrl),
                }),
            ],
        },
    };
});
