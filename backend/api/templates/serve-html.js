module.exports = function serveHTML({serverSideRender, meta, pageType,
  tagsClean, doc: docObj, tagsStr, ssr: ssrObj}) {
  return `
        <ol>
        <li><a href="https://heystacks.org" title="Home">Home</a></li>
        ${(serverSideRender === 'index-tag.html' ? `/<li><a href="/?tags=${tagsClean}" title="${tagsStr}">${tagsStr}</a></li>` : '')}
        ${(serverSideRender === 'index-best.html' ? `/<li><a href=/?sort=Best" title="Best documents">Best documents</a></li>` : '')}
        ${(serverSideRender === 'index-hot.html' ? `/<li><a href="/?sort=Hot" title="Hot documents">Hot documents</a></li>` : '')}
        ${(serverSideRender === 'index-new.html' ? `/<li><a href="/?sort=New" title="New documents">New documents</a></li>` : '')}
        </ol>
        <div>
            <a href="/?sort=Best" title="Best documents">Best documents</a><br/>
            <a href="/?sort=Hot" title="Hot documents">Hot documents</a><br/>
            <a href="/?sort=New" title="New documents">New documents</a><br/>
            <a href="/hall-of-fame" title="Hall of fame">Hall of fame</a><br/>
        </div>
        <main>
            <h1>${meta.title[pageType]}</h1>
${
  docObj.filter(doc => !doc.archived)
    .map(doc => `
                <div>
                <a href="https://heystacks.org/doc/${doc.id}/${doc.slug}" title="${doc.title}">
                    <h2>${doc.title}</h2>
                </a>
                <h4>
                    ${doc.tags
                        .replace(/\'/g, '')
                        .split(', ')
                        .map(tag => `<a href="/?tags=${encodeURIComponent(tag)}" title="${tag}">${tag}</a>`)
                        .join(', ')
                    }
                </h4>
                <p>${doc.description}</p>
                </div>`
    ).join('')
}
        </main>
        <div id="ssr-data-docs-div" style="display: none;" data-json="${JSON.stringify(docObj).replace(/\"/g, '&quot;')}">
        </div>
        <div id="ssr-data-tags-div" style="display: none;" data-json="${JSON.stringify(ssrObj).replace(/\"/g, '&quot;')}"></div>
    `
}
