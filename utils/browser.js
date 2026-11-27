async function closeChildPages(page) {
    const childPages = page.context().pages().filter(openPage => openPage !== page);

    for (const childPage of childPages) {
        if (!childPage.isClosed()) {
            await childPage.close();
        }
    }
}

module.exports = { closeChildPages };
