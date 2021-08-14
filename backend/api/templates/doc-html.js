module.exports = {
    spaceOwnerApprovalEmail: ({docTitle, docDescription, docId, space}) => {
        return `
        <div style="background-color: #fafafa; padding-bottom: 30px; padding-top: 30px;">
          <div style="background-color: #FAFAFA; width: 100%; font-family: \\\\\\Arial\\\\\\, \\\\\\Helvetica Neue\\\\\\, \\\\\\Helvetica\\\\\\, sans-serif; box-sizing: border-box; padding-bottom: 25px; padding-top: 25px; margin: 0;">
             <div style="background-color: #fff; color: #000; font-size: 1em; border-top: 2px solid #f06139; border-bottom: 1px solid #E6E6E6; box-sizing: border-box; padding: 25px; width: 100%; max-width: 600px; margin-left: auto; margin-right: auto;">
               <h3 style="text-align: center; margin-bottom: 5px;">A Google doc has been added to your heystacks Gathering ➕</h3>
               <br>
               <p>Someone has added a link to a Google doc ("${docTitle}") to your heystacks Gathering <a href="https://heystacks.org/s/${space}" target="_blank" style="color: #f06139 !important; text-decoration: none; font-weight: 400;">s/${space}</a>.</p>

               <p>Here is what the doc is about:</p>
               <p style="color: darkgrey; font-weight: 100">${docDescription}</p>

               <p>Do you approve this doc to appear on your gathering?</p>

               <div style="text-align: center; padding-top: 10px; padding-bottom: 10px">
                  <a href="https://heystacks.org/api/spaces/callback?type=approve&docid=${docId}&space=${space}" style="font-size: 20px; display: inline-block; width: 110px; padding: 15px; margin: 10px; background: mediumseagreen; color: white; text-decoration: none;">
                   Approve
                 </a>
                  <a href="https://heystacks.org/api/spaces/callback?type=reject&docid=${docId}&space=${space}" style="font-size: 20px; display: inline-block; width: 110px; padding: 15px; margin: 10px; background: indianred; color: white; text-decoration: none;">
                   Reject
                 </a>
               </div>
               <p>To stop moderating this Gathering, click <a href="mailto:info@heystacks.org?subject=Stop moderating&body=I don\t want to moderate this Gathering anymore" style="color: #f06139 !important; text-decoration: none; font-weight: 400;">here</a>.</p>
               <p>Thank you,<br>
               heystacks team</p>
             </div>
             <div style="text-align: center; padding-top: 15px; margin-bottom: 15px; font-size: 12px; width: 100%; max-width: 600px; margin-left: auto; margin-right: auto;">
               <a href="https://heystacks.org" target="_blank" style="float: left; margin-right: 10px;"><img alt="heystacks" src="https://heystacks.org/logo_supre.png" style="height: 20px;"></a>
             </div>
          </div>
        </div>
        `
    },
    spaceOwnerApprovalMessage: ({docDescription, docTitle, docId, space}) => {
        return `
            A Google doc has been added to your heystacks Gathering ➕
            Someone has added a link to a Google doc ("${docTitle}") to your heystacks Gathering s/${space}
            Here is what the doc is about:
            ${docDescription}
            Do you approve this doc to appear on your gathering?
            Approve: https://heystacks.org/api/spaces/callback?type=approve&docid=${docId}&space=${space}
            Reject: https://heystacks.org/api/spaces/callback?type=reject&docid=${docId}&space=${space}
            To stop moderating this Gathering, reply to this email with a text "stop moderating".
            Thank you,
            heystacks team
        `
    },
    docNotifEmail: ({docObj}) => {
        return `
        <div style="background-color: #fafafa; padding-bottom: 30px; padding-top: 30px;">
        <div style="background-color: #FAFAFA; width: 100%; font-family: \\\    Arial\\\    , \\\   Helvetica Neue\\\  , \\\ Helvetica\\\ , sans-serif; box-sizing: border-box; padding-bottom: 25px; padding-top: 25px; margin: 0;">
               <div style="background-color: #fff; color: #000; font-size: 1em; border-top: 2px solid #f06139; border-bottom: 1px solid #E6E6E6; box-sizing: border-box; padding: 25px; width: 100%; max-width: 600px; margin-left: auto; margin-right: auto;">
                       <h3 style="text-align: center; margin-bottom: 5px;">Your Google doc has been added to heystacks ✅</h3>

                       <br>
                       <p>Someone has added a link to your Google doc ("${docObj.title}") to <a href="https://heystacks.org" target="_blank" style="color: #f06139 !important; text-decoration: none; font-weight: 500;">heystacks</a>.</p>

                       <p>heystacks is a search engine for high-quality, public Google docs - it helps to increase the visibility of exceptional Google docs like yours, which would otherwise be difficult to find.</p>

                       <p>You can find and upvote your document here: https://heystacks.org/doc/${docObj.id}/${docObj.slug}</p>

                       <p>By default, heystacks shows docs in read-only mode which speeds up any editing you might be doing. The readers will also be able to leave comments and tip you.</p>

                       <p>Thank you,<br>
                       heystacks team</p>
                   </div>
                   <div style="text-align: center; padding-top: 15px; margin-bottom: 15px; font-size: 12px; width: 100%; max-width: 600px; margin-left: auto; margin-right: auto;">
                     <a href="https://heystacks.org" target="_blank" style="float: left; margin-right: 10px;"><img alt="heystacks" src="https://heystacks.org/logo_supre.png" style="height: 20px;"></a>
                   </div>
            </div>
        </div>
        `
    },
    docNotifMessage: ({docObj}) => {
        return `
            Your Google doc has been added to heystacks ✅
            Someone has added a link to your Google doc ("${docObj.title}") to https://heystacks.org
            heystacks is a search engine for high-quality, public Google docs - it helps to increase the visibility of exceptional Google docs like yours, which would otherwise be difficult to find.
            You can find and upvote your document here: https://heystacks.org/doc/${docObj.id}/${docObj.slug}
            By default, heystacks shows docs in read-only mode which speeds up any editing you might be doing. The readers will also be able to leave comments and tip you.
            Thank you,
            heystacks team
        `
    },
    docThumbnail: ({backgroundCss, docIcon, title, description}) => {
        return `
        <html><body style="width: 1280px; height: 640px"> +
        <div
          style="
                 width: 1280px;
                 height: 640px;
                 font-family: Inter,Twitter Color Emoji,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
                 line-height: 1.5;
                 letter-spacing: .025em;
                 border-top: 22px solid #f06139;
                 display: flex;
                 justify-content: center;
                 flex-direction: column;
                 ${backgroundCss}
                 "
         >
          <div style="padding-left: 7.2rem; padding-right: 7.2rem; padding-bottom: 30px">
            <div>
              <p style="color: #f06139; font-size: 2rem; line-height: 2.4rem; margin-bottom: 0">${(spacesArr.length ? (s/ + spacesArr[0]) : heystacks.org)}</p>
              <h1 style="font-weight: 900; font-size: 4.0rem; line-height: 4.5rem; margin-top: 0; color: white;">
                <svg alt="Google" style="width: 42px;border-radius: 3px; margin-right: 0; margin-left: 0; margin-bottom: 0px;" xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet">
                  ${docIcon}
                </svg>
                ${title}
              </h1>
              <p style="color: #c9ced2; font-size: 2.6rem; line-height: 3rem; margin-top: 20px">
                ${description}
              </p>
            </div>
          </div>
        </div>
        </body></html>
        `
    }

}