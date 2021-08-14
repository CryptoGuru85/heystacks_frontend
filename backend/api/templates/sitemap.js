module.exports = function sitemap({today, docs, tags}) {
    const docsXml = docs.map(doc => {
        let date = new Date(doc.contentDate || doc.updatedAt)
        return `
            <url>
                <loc>https://heystacks.org/doc/${doc.id}/${doc.slug}</loc>
                <lastmod>${date.getFullYear()}-${(`0` + (date.getMonth() + 1)).slice(-2)}-${(0 + date.getDate()).slice(-2)}</lastmod>
                <changefreq>weekly</changefreq>
                <priority>0.5</priority>
            </url>
        `
    }).join('')
    const tagsXml = tags.map(tag => {
        let date = new Date(tag.updatedAt)
        return `
            <url>
                <loc>https://heystacks.org/?tags=${encodeURIComponent(tag.title).replace(/%25/g, '%')}</loc>
                <lastmod>${date.getFullYear()}-${(0 + (date.getMonth() + 1)).slice(-2)}-${(0 + date.getDate()).slice(-2)}</lastmod>
                <changefreq>daily</changefreq>
                <priority>0.5</priority>
            </url>
        `
    }).join(``)
    
    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>https://heystacks.org</loc>
            <lastmod>${today}</lastmod>
            <changefreq>daily</changefreq>
            <priority>1.0</priority>
        </url>
        <url>
            <loc>https://heystacks.org/teams</loc>
            <lastmod>2020-09-06</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>
        <url>
            <loc>https://heystacks.org/?sort=Best</loc>
            <lastmod>${today}</lastmod>
            <changefreq>daily</changefreq>
            <priority>1.0</priority>
        </url>
        <url>
            <loc>https://heystacks.org/?sort=Hot</loc>
            <lastmod>${today}</lastmod>
            <changefreq>daily</changefreq>
            <priority>1.0</priority>
        </url>
        <url>
            <loc>https://heystacks.org/?sort=New</loc>
            <lastmod>${today}</lastmod>
            <changefreq>daily</changefreq>
            <priority>1.0</priority>
        </url>
            <url>
            <loc>https://heystacks.org/hall-of-fame</loc>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>
        <url>
            <loc>https://heystacks.org/?page-type=add-document</loc>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>
        ${docsXml}
        ${tagsXml}
    </urlset>
    `
}