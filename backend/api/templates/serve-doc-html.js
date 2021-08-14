module.exports = {
    head: ({ docObj }) => {
        return `
        <script type="application/ld+json">
        {
          "@context": "https://schema.org/",
          "@type": "Product",
          "category": "Document",
          "brand": "Google",
          "name": "${docObj.title.replace(/\'/g, '').replace(/\"/g, '\'').replace(/\n/g, '')}",
          "sku": "${docObj.url}",
          "description": "${docObj.description.replace(/\'/g, ).replace(/\"/g, '\'').replace(/\n/g, '')}",` +
          /* "keywords": " +  docObj.tags.replace(/\/g, ).replace(/\"/g, \).replace(/\n/g, )  + ",\n +
           "datePublished": " + new Date(docObj.createdAt).toISOString() + ",\n +
           "EndorsementRating": {\n + */
        
          `"aggregateRating": {
            "ratingCount":  ${docObj.upvotes},
            "bestRating": 5,
            "worstRating": 1,
            "ratingValue": 5
        },` +
        /*  "aggregateRating": {\n +
          "@type": "AggregateRating",\n +
            "ratingCount":  +  docObj.upvotes  + ,\n +
            "bestRating": "10.0",\n +
            "worstRating": "1.0",\n +
            "ratingValue": "10"\n +
        },\n +*/
          `"review": {
            "@type": "Review",
            "reviewRating": {
              "@type": "Rating",
              "bestRating": 5,
              "worstRating": 1,
              "ratingValue": 5
            },
            "author": {
              "@type": "Organization",
              "name": "heystacks"
            },
            "reviewBody": "${
                docObj.description
                    .replace(/\'/g, '')
                    .replace(/\"/g, '\'')
                    .replace(/\n/g, '')}"
          }
        }
        </script>
        `
    },
    html: ({spaceObj, type, title, url, description, content, docObj, similarDocs, commentLinks}) => {
        return `
            <div id="ssr-div" style="position: absolute; top: -200px; left: -200%; width: 100%;">
                <ol>
                    <li>
                        <a title="Home" href="https://heystacks.org">Home</a>
                    </li>
                ${(spaceObj ? 
                    `<li><a title="Home" href="https://heystacks.org/s/${spaceObj.slug}">s/${spaceObj.slug}</a></li>` : '')
                }
                    <li><a title="Google ${type}" href="https://heystacks.org/?type=${type.toLowerCase()}s">Google  ${type}</a></li>
                    <a href="${url}" title="${title}">${title}</a>
                </ol>
                <h1>${title.replace(' - &#x1f7e7;heystacks', '')}</h1>
                <h3>
                    <p>
                ${description.replace(' - &#x1f7e7;heystacks', '')
                    .split('\n')
                    .join(`</p><p>`)
                    .replace(/<p><\/p>/g, '<br/>')
                }   </p>
                </h3>
                <h2>${docObj.tags
                    .replace(/\'/g, '')
                    .split(', ')
                    .map(tag => `<a href="/?tags=${encodeURIComponent(tag)}" title="${tag}">
                        ${tag}</a>`).join(', ')}
                </h2>
                ${(content ? `<main>${content}</main>` : '')}
                <table class="infobox">
                <caption>${title}</caption>
                <body>
                    <tr><th colspan="2" class="colHead">Info</th></tr>
                    <tr>
                        <th scope="row">Tags</th>
                        <td class="col2"><span>${docObj.tags
                            .replace(/\'/g, '')
                            .split(', ' )
                            .filter(tag => tag.length > 0)
                            .map(tag => `<a title="${tag[0].toUpperCase()}${tag.slice(1)}" href="https://heystacks.org/?tags=${tag}"> 
                                ${tag[0].toUpperCase() + tag.slice(1)}</a>`)
                                .join(', ')
                            }
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Type</th>
                        <td class="col2">
                            <a title="Google  ${type}" href="https://heystacks.org/?type=${type.toLowerCase()}s">Google  ${type}</a>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Published</th>
                        <td class="col2">
                            ${(new Date(docObj.contentDate || docObj.updatedAt)).toLocaleString('en-GB')}
                        </td>
                    </tr>
                </body>
                </table>
         ${((similarDocs.length || commentLinks.length) ? `<h3>Resources</h3>` : '')}
            <div>
                ${similarDocs.map(doc => `<h5><a href="https://heystacks.org/doc/${doc.id}/${doc.slug}" title="${doc.title}">
                    ${doc.title}</a></h5>`)
                .join('\n')}
                ${commentLinks.map(link => `<h5>${link}</h5>`)
                    .join('\n')
                }
            </div>
            <div id="ssr-data-div" style="display: none" data-json="${JSON.stringify(docObj).replace(/\"/g, '&quot;')}
        "></div>
        </div>
        `
    },
    mastHead: ({docObj}) => {
        return `
        <div class="d-inline-block masthead-content py-4 px-2" style="padding: 16px 8px 16px 8px;">
          <span style="color: white !important;">
            <h1 class="d-inline-block header-font-1" style="font-weight: 500; margin-bottom: 0; margin-top: 5px; max-width: 800px">
              <div style="display: inline-block; width: 22px; margin-right: 3px; margin-left: 2px;">
              ${
                (docObj.url || '').includes('/document/')
                  ? `<span class="logo-link">
                      <svg alt="Google" style="border-radius: 3px; margin-bottom: -2px;" xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet">
                        <rect x="5" y="5" width="55" height="55" style="fill: white;"></rect>
                        <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="#4285F4" stroke="none">
                          <path d="M 0.648 639.352 L 0.648 1.409 L 639.352 0.648 L 639.352 639.352 L 0.648 639.352 Z M 500 465 L 500 430 L 320 430 L 140 430 L 140 465 L 140 500 L 320 500 L 500 500 L 500 465 Z M 500 325 L 500 290 L 320 290 L 140 290 L 140 325 L 140 360 L 320 360 L 500 360 L 500 325 Z M 390 185 L 390 150 L 265 150 L 140 150 L 140 185 L 140 220 L 265 220 L 390 220 L 390 185 Z"></path>
                        </g>
                      </svg>
                    </span>`
                  : (docObj.url || '').includes('/spreadsheets/') ?
                    `<span class="logo-link">
                      <svg alt="Google" style="border-radius: 3px; margin-bottom: -2px;" xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet">
                        <rect x="5" y="5" width="55" height="55" style="fill: white;"></rect>
                        <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="#0F9D58" stroke="none">
                          <path d="M0 320 l0 -320 320 0 320 0 0 320 0 320 -320 0 -320 0 0 -320z m280 180 l0 -70 145 0 145 0 0 -35 0 -35 -145 0 -145 0 0 -145 0 -145 -35 0 -35 0 0 145 0 145 -70 0 -70 0 0 35 0 35 70 0 70 0 0 70 0 70 35 0 35 0 0 -70z"/>
                        </g>
                      </svg>
                    </span>`
                  : (docObj.url || '').includes('/presentation/') ?
                    `<span class="logo-link">
                      <svg alt="Google" style="border-radius: 3px; margin-bottom: -2px;" xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet">
                        <rect x="5" y="5" width="55" height="55" style="fill: white;"></rect>
                        <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="#F4B400" stroke="none">
                          <path d="M0 320 l0 -320 320 0 320 0 0 320 0 320 -320 0 -320 0 0 -320z m570 0 l0 -140 -250 0 -250 0 0 140 0 140 250 0 250 0 0 -140z"/>
                        </g>
                      </svg>
                    </span>`
                  : ''
              }
              </div>
              ${(docObj.title || '').substring(0, 200)}
              ${docObj.hallOfFame ? '<div style="display: inline-block; width: 24px"></div>' : ''}
            </h1>
          </span>
          <h2 class="masthead-explainer header-font-2" style="margin-top: 20px; line-height: 1.4em; max-width: 800px; opacity: 0.9; font-weight: 400;">
            ${(docObj.description || '').split('\n')[0].substring(0, 400)}
          </h2>
          <div style="margin-top: 20px; max-width: 800px; color: #cecece;">
            ${
              (docObj.tags || '').replace(/\'/g, '').split(', ').map((tag, tid) => {
                return '<div style="display: inline-block"><span style="color: #cecece !important;">'
                + tag + '</span>' + (tid < (docObj.tags || '').split(', ').length - 1 ? '<span style="display: inline-block; width: 11px; margin-left: 6px; margin-right: 6px">•</span>' : '') +
                '</div>'
              }).join('')
            }
          </div>
        </div>
      `
    }
}