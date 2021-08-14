module.exports = {
    addSpaceEmail: ({name}) => {
        return `
        <div style="background-color: #fafafa; padding-bottom: 30px; padding-top: 30px;">
          <div style="background-color: #FAFAFA; width: 100%; font-family: \\\\\\Arial\\\\\\, \\\\\\Helvetica Neue\\\\\\, \\\\\\Helvetica\\\\\\, sans-serif; box-sizing: border-box; padding-bottom: 25px; padding-top: 25px; margin: 0;">
             <div style="background-color: #fff; color: #000; font-size: 1em; border-top: 2px solid #f06139; border-bottom: 1px solid #E6E6E6; box-sizing: border-box; padding: 25px; width: 100%; max-width: 600px; margin-left: auto; margin-right: auto;">
                <h3 style="text-align: center; margin-bottom: 5px;">Gathering <a href="https://heystacks.org/s/${name}">${name}</a> has been created 👍</h3>
               <br>
                <p>Thank you for creating a heystacks Gathering.</p>
               <p>Docs added to this gathering will need to be approved by you (the moderator).</p>
               <p>If you would like to add more moderators to this gathering, reply to this email with their email addresses.</p>
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
    addSpaceMessage: ({name}) => {
        return `
            Gathering ${name} has been created 👍
            Thank you for creating a heystacks Gathering.
            Docs added to this gathering will need to be approved by you (the moderator).
            If you would like to add more moderators to this gathering, reply to this email with their email addresses
            Thank you,
            heystacks team
        `
    },
    
}