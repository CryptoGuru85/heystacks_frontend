module.exports = {
    tippedEmail: ({docObj}) => {
        return `
        <div style="background-color: #fafafa; padding-bottom: 30px; padding-top: 30px;">
        <div style="background-color: #FAFAFA; width: 100%; font-family: \\\    Arial\\\    , \\\   Helvetica Neue\\\  , \\\ Helvetica\\\ , sans-serif; box-sizing: border-box; padding-bottom: 25px; padding-top: 25px; margin: 0;">
        <div style="background-color: #fff; color: #000; font-size: 1em; border-top: 2px solid #f06139; border-bottom: 1px solid #E6E6E6; box-sizing: border-box; padding: 25px; width: 100%; max-width: 600px; margin-left: auto; margin-right: auto;">
                   <p>Hello,</a>.</p>
                   
                   <p>Your tip and your message have been sent to the author of " ${docObj.title} "</p>
                   
                   <p>Thank you for your generosity! We hope to see you again on heystacks.</p>
                   
                   <p>Best regards,<br>
                   heystacks team</p>
               </div>
               <div style="text-align: center; padding-top: 15px; margin-bottom: 15px; font-size: 12px; width: 100%; max-width: 600px; margin-left: auto; margin-right: auto;">
                 <a href="https://heystacks.org" target="_blank" style="float: left; margin-right: 10px;"><img alt="heystacks" src="https://heystacks.org/logo_supre.png" style="height: 20px;"></a>
               </div>
        </div>
        </div>
        `
    },
    tippedMessage: ({docObj}) => {
        return `
            Hello,

            Your tip and your message have been sent to the author of "${docObj.title}"

            Thank you for your generosity! We hope to see you again on heystacks.

            Best regards,
            heystacks team  
        `
    }
}