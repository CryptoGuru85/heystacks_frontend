module.exports = {
    notifEmailAddress: ({emailAddress, id}) => {
        return `
        <div style="background-color: #fafafa; padding-bottom: 30px; padding-top: 30px;">
            <div style="background-color: #FAFAFA; width: 100%; font-family: \\\Arial\\\, \\\Helvetica Neue\\\, \\\Helvetica\\\, sans-serif; box-sizing: border-box; padding-bottom: 25px; padding-top: 25px; margin: 0;">
                   <div style="background-color: #fff; color: #000; font-size: 1em; border-top: 2px solid #f06139; border-bottom: 1px solid #E6E6E6; box-sizing: border-box; padding: 25px; width: 100%; max-width: 600px; margin-left: auto; margin-right: auto;">
                       <h3 style="text-align: center; margin-bottom: 5px;">Welcome to heystacks!</h3>
                       
                       <br>
                       <p>Weve received your email details. Once a month you will receive a delivery of the top 3 Google docs trending on heystacks.</p>
                       
                       <p>Until then, you can find and upvote Google docs on <a href="https://heystacks.org" target="_blank" style="color: #f06139 !important; text-decoration: none; font-weight: 400;">https://heystacks.org</a></p>
                       
                       <p>Thank you,<br>
                       heystacks team</p>
                       
                       
                   </div>
                   <div style="text-align: center; padding-top: 15px; margin-bottom: 15px; font-size: 12px; width: 100%; max-width: 600px; margin-left: auto; margin-right: auto;">
                     <a href="https://heystacks.org" target="_blank" style="float: left; margin-right: 10px;"><img alt="heystacks" src="https://heystacks.org/logo_supre.png" style="height: 20px;"></a>
                     <span style="float: right; text-align: left; margin-left: 10px; color: darkgrey;"><a href="https://heystacks.org/unsubscribe?email=${emailAddress}&id=${id}" style="color: grey; text-decoration: none">Unsubscribe</a></span>
                   </div>
            </div>
        </div>`
    },
    notifEmailAddressMessage: () => {
        return `
            Welcome to heystacks!
            
            We\ve received your email details. Once a month you will receive a delivery of the top 3 Google docs on heystacks.
            
            Until then, you can find and upvote Google docs on https://heystacks.org

            Thank you,
            heystacks team
        `
    },
    docsEmailUpdate: ({docData, user}) => {
        return `
        
        <div style="background-color: #FAFAFA; width: 100%; font-family: \\\
        Arial\\\
        , \\\
        Helvetica Neue\\\
        , \\\
        Helvetica\\\
        , sans-serif; box-sizing: border-box; padding-bottom: 25px; padding-top: 25px; margin: 0;">
        
               <div style="background-color: #fff; color: #000; font-size: 1em; border-top: 2px solid #f06139; border-bottom: 1px solid #E6E6E6; box-sizing: border-box; padding: 25px; width: 100%; max-width: 600px; margin-left: auto; margin-right: auto;">
        
                   <h3 style="text-align: center; margin-bottom: 5px;">Top 3 docs on heystacks</h3>
        
                   <a href="https://heystacks.org/doc/${docData[0].id}/${docData[0].slug}" target="_blank" style="color: #074246 !important; text-decoration: none; margin-left: 5px;"><h4 style="margin-top: 10px; margin-bottom: 5px;">
        
                       1. <img data-v-1748a156="" src="https://heystacks.org/icons/ docData[0].type + 
        -icon.png" alt="" style="height: 15px; margin-bottom: -5px; margin-right: 5px;">${docData[0].title}
        
                   </h4></a>
        
                   <p style="white-space: pre-wrap; margin-bottom: 10px; margin-top: 5px;">${docData[0].description}</p>
        
                   <p style="text-align: center; white-space: pre-wrap; margin-bottom: 10px; margin-top: 5px;">
                      
        <a href="https://www.facebook.com/sharer/sharer.php?u=https://heystacks.org/doc/${docData[0].id}/${docData[0].slug}&t=Check out this Google doc!" title="Share on Facebook" style="cursor: pointer; padding-top: 10px">
                      
                      <img src="https://heystacks.org/icons/facebook.png" style="width: 18px; padding-left: 16px; padding-right: 16px;">
                      
                      </a>
                      
                      <a href="https://twitter.com/share?text=Check out this Google doc!&url=https://heystacks.org/doc/${docData[0].id}/${docData[0].slug}&hashtags=heystacks" title="Share on Twitter" style="cursor: pointer; padding-top: 10px">
                      
                      <img src="https://heystacks.org/icons/twitter.png" style="width: 18px; padding-left: 16px; padding-right: 16px;">
                      
                      </a>
                      
                      <a href="https://www.linkedin.com/shareArticle?mini=true&url=https://heystacks.org/doc/${docData[0].id}/${docData[0].slug}&title=Check out this Google doc!" title="Share on LinkedIn" style="cursor: pointer; padding-top: 10px">
                      
                      <img src="https://heystacks.org/icons/linkedin.png" style="width: 18px; padding-left: 16px; padding-right: 16px;">
                      
                      </a>
                      
                      </p>
        
                                 <a href="https://heystacks.org/doc/${docData[1].id}/${docData[1].slug}" target="_blank" style="color: #074246 !important; text-decoration: none; margin-left: 5px;"><h4 style="margin-top: 10px; margin-bottom: 5px;">
        
                       2. <img data-v-1748a156="" src="https://heystacks.org/icons/${docData[1].type}
        -icon.png" alt="" style="height: 15px; margin-bottom: -5px; margin-right: 5px;">${docData[1].title}
        
                   </h4></a>
        
                   <p style="white-space: pre-wrap; margin-bottom: 10px; margin-top: 5px;"> docData[1].description + 
        </p>
        
                   <p style="text-align: center; white-space: pre-wrap; margin-bottom: 10px; margin-top: 5px;">
                      
        <a href="https://www.facebook.com/sharer/sharer.php?u=https://heystacks.org/doc/${docData[1].id}/${docData[1].slug}&t=Check out this Google doc!" title="Share on Facebook" style="cursor: pointer; padding-top: 10px">
                      
                      <img src="https://heystacks.org/icons/facebook.png" style="width: 18px; padding-left: 16px; padding-right: 16px;">
                      
                      </a>
                      
                      <a href="https://twitter.com/share?text=Check out this Google doc!&url=https://heystacks.org/doc/${docData[1].id}/${docData[1].slug}&hashtags=heystacks" title="Share on Twitter" style="cursor: pointer; padding-top: 10px">
                      
                      <img src="https://heystacks.org/icons/twitter.png" style="width: 18px; padding-left: 16px; padding-right: 16px;">
                      
                      </a>
                      
                      <a href="https://www.linkedin.com/shareArticle?mini=true&url=https://heystacks.org/doc/${docData[1].id}/${docData[1].slug}&title=Check out this Google doc!" title="Share on LinkedIn" style="cursor: pointer; padding-top: 10px">
                      
                      <img src="https://heystacks.org/icons/linkedin.png" style="width: 18px; padding-left: 16px; padding-right: 16px;">
                      
                      </a>
                    
                      </p>
        
                               <a href="https://heystacks.org/doc/${docData[2].id}/${docData[2].slug}" target="_blank" style="color: #074246 !important; text-decoration: none; margin-left: 5px;"><h4 style="margin-top: 10px; margin-bottom: 5px;">
        
                       3. <img data-v-1748a156="" src="https://heystacks.org/icons/${docData[2].type}-icon.png" alt="" style="height: 15px; margin-bottom: -5px; margin-right: 5px;">${docData[2].title}
        
                   </h4></a>
        
                   <p style="white-space: pre-wrap; margin-bottom: 10px; margin-top: 5px;">${docData[2].description}</p>
        
                   <p style="text-align: center; white-space: pre-wrap; margin-bottom: 10px; margin-top: 5px;">
                      
        <a href="https://www.facebook.com/sharer/sharer.php?u=https://heystacks.org/doc/${docData[2].id}/${docData[2].slug}&t=Check out this Google doc!" title="Share on Facebook" style="cursor: pointer; padding-top: 10px">
                      
                      <img src="https://heystacks.org/icons/facebook.png" style="width: 18px; padding-left: 16px; padding-right: 16px;">
                      
                      </a>
                      
                      <a href="https://twitter.com/share?text=Check out this Google doc!&url=https://heystacks.org/doc/${docData[2].id}/${docData[2].slug}&hashtags=heystacks" title="Share on Twitter" style="cursor: pointer; padding-top: 10px">
                      
                      <img src="https://heystacks.org/icons/twitter.png" style="width: 18px; padding-left: 16px; padding-right: 16px;">
                      
                      </a>
                      
                      <a href="https://www.linkedin.com/shareArticle?mini=true&url=https://heystacks.org/doc/${docData[2].id}/${docData[2].slug}&title=Check out this Google doc!" title="Share on LinkedIn" style="cursor: pointer; padding-top: 10px">
                      
                      <img src="https://heystacks.org/icons/linkedin.png" style="width: 18px; padding-left: 16px; padding-right: 16px;">
                      
                      </a>
                      
                      </p>
        
                                 <br>
        /*
                   <p>Find more docs like this on <a href="https://heystacks.org" target="_blank" style="color: #f06139 !important; text-decoration: none; font-weight: 400;">heystacks</a></p>*/
        /*
                   <p>Have something interesting on your mind? Create a Google doc and share it using heystacks.</p>*/
        
                   <p>Also, have a look at some popular Gatherings:</p>
        
                   <p><a href="https://heystacks.org/s/Women" target="_blank" style="color: #f06139 !important; text-decoration: none; font-weight: 400;">s/Women</a></p>
        
                   <p><a href="https://heystacks.org/s/Coronavirus" target="_blank" style="color: #f06139 !important; text-decoration: none; font-weight: 400;">s/Coronavirus</a></p>
        
                   <p><a href="https://heystacks.org/s/Games" target="_blank" style="color: #f06139 !important; text-decoration: none; font-weight: 400;">s/Games</a></p>
        
                   <p>Thank you,<br>
        
                   heystacks team</p>
        
                   <a href="${docData[0].url}" target="_blank" style="color: darkgrey; font-size: 12px; text-decoration: none;">&nbsp;</a>
        
                   <a href="${docData[1].url}" target="_blank" style="color: darkgrey; font-size: 12px; text-decoration: none;">&nbsp;</a>
        
                   <a href="${docData[2].url}" target="_blank" style="color: darkgrey; font-size: 12px; text-decoration: none;">&nbsp;</a>
        
                   
        
                   
        
               </div>
        
               <div style="text-align: center; padding-top: 15px; margin-bottom: 15px; font-size: 12px; width: 100%; max-width: 600px; margin-left: auto; margin-right: auto;">
        
                 <a href="https://heystacks.org" target="_blank" style="float: left; margin-right: 10px;"><img alt="heystacks" src="https://heystacks.org/logo_supre.png" style="height: 20px;"></a>
        
                 <span style="float: right; text-align: left; margin-left: 10px; color: darkgrey;"><a href="https://heystacks.org/unsubscribe?email=${user[0]}&id=${user[1]}" style="color: grey; text-decoration: none">Unsubscribe</a></span>
        
               </div>
        
        </div>
        
        `
    },
    docsEmailUpdateMessage: ({docData}) => {
        return `
        Top 3 docs on heystacks
        1. ${docData[0].title}
        ${docData[0].url}/${docData[0].slug}
        ${docData[0].description}

        2. ${docData[1].title}
        ${docData[1].url}/${docData[1].slug}
        ${docData[1].description}
        
        3. ${docData[2].title}
        ${docData[2].url}/${docData[2].slug}
        ${docData[2].description}
        
        
        Find and upvote more docs like this on https://heystacks.org
        
        Have something interesting on your mind? Create a Google doc and share it using heystacks.
        
        Thank you,
        heystacks team
        `
    },
    launchEmail: () => {
        return `
        
        <div style="background-color: #FAFAFA; width: 100%; font-family: \\\Arial\\\, \\\Helvetica Neue\\\, \\\Helvetica\\\, sans-serif; box-sizing: border-box; padding-bottom: 25px; padding-top: 25px; margin: 0;">
        
               <div style="background-color: #fff; color: #000; font-size: 1em; border-top: 2px solid #f06139; border-bottom: 1px solid #E6E6E6; box-sizing: border-box; padding: 25px; width: 100%; max-width: 600px; margin-left: auto; margin-right: auto;">
        
                   <h3 style="text-align: center; margin-bottom: 30px">Discover the Best Public Google docs</h3>
        
                   <p style="">Hi, just wanted to let you know that we have launched <strong>heystacks</strong> - a search engine for public Google docs.</p>
        
                   <p style=""><a href="https://heystacks.org" target="_blank" style="color: #f06139 !important; text-decoration: none; font-weight: 400;">https://heystacks.org</a></p>
        
                   <p>You can find docs about working from home, parenting, Covid-19 response and many other fascinating topics which would otherwise stay undiscovered.</p>
        
                   <p>If you have authored a Google Doc or Sheet which you would like to share with other people - make it public and add it here:</p>
        
                   <p style=""><a href="https://heystacks.org/?page-type=add-document" target="_blank" style="color: #f06139 !important; text-decoration: none; font-weight: 400;">https://heystacks.org/?page-type=add-document</a></p>
        
                   <p style="margin-top: 30px">Thank you,<br>
        
                   heystacks team</p>
               </div>
        
               <div style="text-align: center; padding-top: 15px; margin-bottom: 15px; font-size: 12px; width: 100%; max-width: 600px; margin-left: auto; margin-right: auto;">
        
                 <a href="https://heystacks.org" target="_blank" style="float: left; margin-right: 10px;"><img alt="heystacks" src="https://heystacks.org/logo_supre.png" style="height: 20px;"></a>
               </div>
        </div>
        `
    },
    launchMessage: () => {
        return `
            Discover the Best Public Google docs
            Hi, just wanted to let you know that we have launched heystacks - a search engine for public Google docs.
            https://heystacks.org
            You can find docs about working from home, parenting, Covid-19 response and many other fascinating topics which would otherwise stay undiscovered.
            If you have authored a Google Doc or Sheet which you would like to share with other people - make it public and add it here:
            https://heystacks.org/?page-type=add-document
            Thank you,
            heystacks team
        `
    }

}