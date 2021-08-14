module.exports = {
    commentNotifEmail: ({docObj, text, nickname, commentObj}) => {
        return `
        <div style="background-color: #fafafa; padding-bottom: 30px; padding-top: 30px;">
            <div style="background-color: #FAFAFA; width: 100%; font-family: \\\Arial\\\, \\\Helvetica Neue\\\, \\\Helvetica\\\, sans-serif; box-sizing: border-box; padding-bottom: 25px; padding-top: 25px; margin: 0;">
                <div style="background-color: #fff; color: #000; font-size: 1em; border-top: 2px solid #f06139; border-bottom: 1px solid #E6E6E6; box-sizing: border-box; padding: 25px; width: 100%; max-width: 600px; margin-left: auto; margin-right: auto;">
                    <h3 style="text-align: center; margin-bottom: 5px;">New comment on your Google doc\s heystacks page</h3>
                    <br>
                    <p>Someone has commented on your Google doc ("${docObj.title}").</p>
                    <p><span style="font-weight: 600">${nickname}</span> wrote:</p>
                    <p>${text}</p>
                    <p>To reply, visit <a href="https://heystacks.org/doc/${docObj.id}/${docObj.slug}#comment-section" title="Document">https://heystacks.org/doc/${docObj.id}/${docObj.slug}#comment-section</a></p>
                    <p>If you don\t like this comment, visit <a href="https://heystacks.org/doc/${docObj.id}/${docObj.slug}?comment-report=${commentObj.id}#comment-section" title="Comment report">https://heystacks.org/doc/${docObj.id}/${docObj.slug}?comment-report=${commentObj.id}</a> and we\ll remove it.</p>
                    <p>To disable comment notifications like this one, unsubscribe here <a href="https://heystacks.org/comments-unsubscribe?id=${docObj.id}" title="Unsubscribe">https://heystacks.org/comments-unsubscribe?id=${docObj.id}</a></p>
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
    newCommentNotifMessage: ({nickname, text, docObj, commentObj}) => {
        return `
            New comment on your Google doc's heystacks page
            Someone has commented on your Google doc ("${docObj.title}").
        
            ${nickname} wrote:
            "${text}" 


            To reply, visit https://heystacks.org/doc/${docObj.id}/${docObj.slug}    
        
            If you don't like this comment, visit https://heystacks.org/doc/${docObj.id}/${docObj.slug}?comment-report=${commentObj.id}#comment-section and we'll remove it.
        
            To disable comment notifications like this one, unsubscribe here: https://heystacks.org/doc/comments-unsubscribe?id=${docObj.id}  
        
            Thank you,
            heystacks team
        `
    },
    commentReplyNotifEmail: ({nickname, text, docObj}) => {
        return `
        <div style="background-color: #fafafa; padding-bottom: 30px; padding-top: 30px;">
            <div style="background-color: #FAFAFA; width: 100%; font-family: \\\'Arial\\\', \\\'Helvetica Neue\\\', \\\'Helvetica\\\', sans-serif; box-sizing: border-box; padding-bottom: 25px; padding-top: 25px; margin: 0;">
               <div style="background-color: #fff; color: #000; font-size: 1em; border-top: 2px solid #f06139; border-bottom: 1px solid #E6E6E6; box-sizing: border-box; padding: 25px; width: 100%; max-width: 600px; margin-left: auto; margin-right: auto;">
                   <h3 style="text-align: center; margin-bottom: 5px;">Someone replied to your comment in heystacks</h3>
                   <br>
                   <p>Someone replied to your comment.</p>
                   
                   <p><span style="font-weight: 600">${nickname}</span> wrote:</p>
                   <p>${text}</p>
                   
                   <p>To reply, visit <a href="https://heystacks.org/doc/${docObj.id}/${docObj.slug}#comment-section" title="Document">https://heystacks.org/doc/${docObj.id}/${docObj.slug}#comment-section</a></p>
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
    commentReplyNotifMessage: ({nickname, text, docObj}) => {
        return `
        Someone replied to your comment in heystacks
        
        Someone replied to your comment in heystacks.
        
        ${nickname} wrote:
        "${text}"
        

        To reply, visit https://heystacks.org/doc/${docObj.id}/${docObj.slug}
        

        Thank you,
        heystacks team
    `
    }

}
