const fs = require('fs');
let content = fs.readFileSync('src/pages/ResultPage.vue', 'utf8');

const startIndex = content.indexOf('<section class="share-card-block"');
if (startIndex !== -1) {
    const endStr = '</section>';
    const endIndex = content.indexOf(endStr, startIndex) + endStr.length;
    
    let newBlock = '<div style="margin-top: 40px; display: flex; flex-direction: column; align-items: center; gap: 16px;">\n';
    newBlock += '  <button @click="exportPosterImage" :disabled="share.isExporting.value" class="export-image-btn" :style="{ backgroundColor: resultThemeColor }">\n';
    newBlock += '    <AppIcon name="spinner" v-if="share.isExporting.value" style="animation: spin 1s linear infinite" />\n';
    newBlock += '    <AppIcon name="download" v-else />\n';
    newBlock += '    <span style="letter-spacing: 0.05em">{{ share.isExporting.value ? t(\'common.generating\', undefined, \'生成中...\') : t(\'common.saveImage\', undefined, \'生成并分享次元身份卡\') }}</span>\n';
    newBlock += '  </button>\n';
    newBlock += '  <p v-if="share.feedback.value" class="export-feedback">{{ share.feedback.value }}</p>\n';
    newBlock += '</div>\n\n';
    newBlock += '<div class="poster-capture-wrapper">\n';
    newBlock += '  <SharePoster ref="posterRef" :result="result" />\n';
    newBlock += '</div>\n';

    content = content.substring(0, startIndex) + newBlock + content.substring(endIndex);
    
    if (!content.includes('.poster-capture-wrapper')) {
        let cssBlock = '.poster-capture-wrapper {\n  position: absolute;\n  top: -9999px;\n  left: -9999px;\n  width: 440px;\n  pointer-events: none;\n  z-index: -9999;\n}\n</style>';
        content = content.replace('</style>', cssBlock);
    }
    
    fs.writeFileSync('src/pages/ResultPage.vue', content);
    console.log('Fixed ResultPage.vue');
} else {
    console.log('Not found');
}
