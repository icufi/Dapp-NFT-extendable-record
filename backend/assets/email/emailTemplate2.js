export default emailTemplate = (image) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

        <!-- Facebook sharing information tags -->
        <meta property="og:title" content="*|MC:SUBJECT|*">
        <meta property="fb:admins" content="626467703"/>
        <meta property="fb:app_id" content="808970299184874"/>
        <title>*|MC:SUBJECT|*</title>



<style type="text/css">
  @media only screen and (max-width: 550px){
    table[class=containerTable]{
      width:100% !important;
    }

} @media only screen and (max-width: 550px){
    .headerContent img{
      width:100%;
      height:auto;
    }

} @media only screen and (max-width: 550px){
    .article img {
      max-width: none !important;
      margin-bottom: 0 !important;
    }
    .article .article-image{
      width: 100% !important;
      float: none !important;
      height:auto;
      margin-right: 0 !important;
      margin-bottom: 5px !important;
    }
    .article p, .article h4{
      margin-left: 0 !important;
    }

} @media only screen and (max-width: 550px){
    #templateBody>tbody>tr>td{
      padding:30px !important;
    }

} @media only screen and (max-width: 550px){
    #backgroundTable{
      margin:0 !important;
    }

} @media only screen and (max-width: 480px){
    #templateBody>tbody>tr>td{
      padding:15px !important;
    }

}   #outlook a{
      padding:0;
    }
    body{
      width:100% !important;
    }
    .ReadMsgBody{
      width:100%;
    }
    .ExternalClass{
      width:100%;
    }
    body{
      -webkit-text-size-adjust:none;
      // -webkit-font-smoothing:antialiased;
    }
    body{
      margin:0;
      padding:0;
    }
    img{
      border:0;
      height:auto;
      line-height:100%;
      outline:none;
      text-decoration:none;
    }
    table td{
      border-collapse:collapse;
    }
    #backgroundTable{
      height:100% !important;
      margin:20px 0 0 0;
      padding:0;
      width:100% !important;
    }
    .article-list {
      margin-top: 40px;
    }
    .article {
      clear: both;
      margin-bottom: 40px;
    }
    .article img {
      width: 100% !important;
    }
    .article .article-image {
      width: 175px;
      float: left;
      margin-right: 10px;
      margin-bottom: 40px;
    }
    .article h4, .article p {
      margin-left: 185px;
    }
    .article p {
      margin-top: 0;
    }
    .article a {
      font-weight: inherit !important;
    }
    .clear {
      clear: both;
      height: 0;
    }
  /*
  @tab Page
  @section background color
  @tip Set the background color for your email. You may want to choose one that matches your company's branding.
  @theme page
  */
    body,#backgroundTable{
      /*@editable*/background-color:#edece4;
    }
  /*
  @tab Page
  @section email border
  @tip Set the border for your email.
  */
    #templateContainer{
      /*@editable*/border:0px solid #DDDDDD;
    }
  /*
  @tab Page
  @section heading 1
  @tip Set the styling for all first-level headings in your emails. These should be the largest of your headings.
  @style heading 1
  */
    h1,.h1{
      /*@editable*/color:#202020;
      display:block;
      /*@editable*/font-family:'Lucida Grande', 'Lucida Sans Unicode', Helvetica, Arial, sans-serif;
      /*@editable*/font-size:34px;
      /*@editable*/font-weight:bold;
      /*@editable*/line-height:1.3em;
      margin-top:0;
      margin-right:0;
      margin-bottom:10px;
      margin-left:0;
      /*@editable*/text-align:left;
    }
  /*
  @tab Page
  @section heading 2
  @tip Set the styling for all second-level headings in your emails.
  @style heading 2
  */
    h2,.h2{
      /*@editable*/color:#202020;
      display:block;
      /*@editable*/font-family:'Lucida Grande', 'Lucida Sans Unicode', Helvetica, Arial, sans-serif;
      /*@editable*/font-size:30px;
      /*@editable*/font-weight:bold;
      /*@editable*/line-height:1.3em;
      margin-top:0;
      margin-right:0;
      margin-bottom:10px;
      margin-left:0;
      /*@editable*/text-align:left;
    }
  /*
  @tab Page
  @section heading 3
  @tip Set the styling for all third-level headings in your emails.
  @style heading 3
  */
    h3,.h3{
      /*@editable*/color:#000;
      display:block;
      /*@editable*/font-family:'Lucida Grande', 'Lucida Sans Unicode', Helvetica, Arial, sans-serif;
      /*@editable*/font-size:20px;
      /*@editable*/font-weight:bold;
      /*@editable*/line-height:1.3em;
      margin-top:0;
      margin-right:0;
      margin-bottom:0.667em;
      margin-left:0;
      /*@editable*/text-align:left;
    }
  /*
  @tab Page
  @section heading 4
  @tip Set the styling for all fourth-level headings in your emails. These should be the smallest of your headings.
  @style heading 4
  */
    h4,.h4{
      /*@editable*/color:#202020;
      display:block;
      /*@editable*/font-family:'Lucida Grande', 'Lucida Sans Unicode', Helvetica, Arial, sans-serif;
      /*@editable*/font-size:16px;
      /*@editable*/font-weight:bold;
      /*@editable*/line-height:1.3em;
      margin-top:0;
      margin-right:0;
      margin-bottom:4px;
      margin-left:0;
      /*@editable*/text-align:left;
    }
  /*
  @tab Page
  @section button
  @style button
  */
    a:link.button{
      /*@editable*/background-color:#9fbb58;
      /*@editable*/color:#fff !important;
      /*@editable*/font-family:'Lucida Grande', 'Lucida Sans Unicode', Helvetica, Arial, sans-serif;
      /*@editable*/font-size:14px;
      /*@editable*/font-weight:normal;
      /*@editable*/line-height:1.5em;
      display:inline-block;
      text-decoration:none !important;
      padding-top:5px;
      padding-bottom:5px;
      padding-right:10px;
      padding-left:10px;
    }
  /*
  @tab Body
  @section body style
  @tip Set the background color for your email's body area.
  */
    #templateContainer,.bodyContent{
      /*@editable*/background-color:#FFFFFF;
    }
  /*
  @tab Body
  @section body text
  @tip Set the styling for your email's main content text. Choose a size and color that is easy to read.
  @theme main
  */
    .bodyContent div{
      /*@editable*/color:#000;
      /*@editable*/font-family:'Lucida Grande', 'Lucida Sans Unicode', Helvetica, Arial, sans-serif;
      /*@editable*/font-size:14px;
      /*@editable*/line-height:1.6em;
      /*@editable*/text-align:left;
    }
    .bodyContent p:first-child{
      margin-top: 0;
    }
  /*
  @tab Body
  @section body link
  @tip Set the styling for your email's main content links. Choose a color that helps them stand out from your text.
  */
    .bodyContent div a:link,.bodyContent div a:visited,.bodyContent div a .yshortcuts{
      /*@editable*/color:#336699;
      /*@editable*/font-weight:normal;
      /*@editable*/text-decoration:underline;
    }
    .bodyContent img{
      display:inline;
      height:auto;
      margin-bottom:10px;
      max-width:280px;
    }
  /*
  @tab Footer
  @section footer style
  @tip Set the background color and top border for your email's footer area.
  @theme footer
  */
    #templateFooter{
      /*@editable*/background-color:#edece4;
      /*@editable*/border-top:0;
    }
  /*
  @tab Footer
  @section footer text
  @tip Set the styling for your email's footer text. Choose a size and color that is easy to read.
  @theme footer
  */
    .footerContent div{
      /*@editable*/color:#999;
      /*@editable*/font-family:'Lucida Grande', 'Lucida Sans Unicode', Helvetica, Arial, sans-serif;
      /*@editable*/font-size:11px;
      /*@editable*/line-height:2em;
      /*@editable*/text-align:left;
    }
  /*
  @tab Footer
  @section footer link
  @tip Set the styling for your email's footer links. Choose a color that helps them stand out from your text.
  */
    .footerContent div a:link,.footerContent div a:visited,.footerContent div a .yshortcuts{
      /*@editable*/color:#5ba4e5;
      /*@editable*/font-weight:normal;
      /*@editable*/text-decoration:underline;
    }
    .footerContent img{
      display:inline;
      height:auto;
      margin-bottom:10px;
      max-width:280px;
    }
  /*
  @tab Footer
  @section utility bar style
  @tip Set the background color and border for your email's footer utility bar.
  @theme footer
  */
    #utility{
      /*@editable*/background-color:#edece4;
    }
  /*
  @tab Footer
  @section utility bar style
  @tip Set the background color and border for your email's footer utility bar.
  */
    #utility div{
      /*@editable*/text-align:center;
    }
</style></head>
    <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0">
      <center>
          <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="backgroundTable">
              <tr>
                  <td align="center" valign="top">
                      <table border="0" cellpadding="0" cellspacing="0" width="600" id="templateContainer" class="containerTable">
                          <tr>
                              <td align="center" valign="top">
                                    <!-- // Begin Template Header \\ -->
                                  <table border="0" cellpadding="0" cellspacing="0" width="600" id="templateHeader" class="containerTable">
                                        <tr>
                                            <td class="headerContent">

                                              <!-- // Begin Module: Standard Header Image \\ -->
                                              <div style="text-align: center;"><img src="https://gallery.mailchimp.com/e5898ac1e68db70ce0dfefa88/images/60b19aac-7fd6-4964-b9eb-27161fbaa16b.jpg" alt="Header Image" border="0" style="border-style:none; margin: 0; padding: 0;max-width:720px;" id="headerImage campaign-icon" mc:edit="header_image"></div>
                                              <!-- // End Module: Standard Header Image \\ -->

                                            </td>
                                        </tr>
                                    </table>
                                    <!-- // End Template Header \\ -->
                                </td>
                            </tr>
                          <tr>
                              <td align="center" valign="top">
                                    <!-- // Begin Template Body \\ -->
                                  <table border="0" cellpadding="40" cellspacing="0" width="100%" id="templateBody">
                                      <tr>
                                            <td valign="top" class="bodyContent">

                                                <!-- // Begin Module: Standard Postcard Content \\ -->
                                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                  <tr>
                                                    <td valign="top">
                                                      <h3 mc:edit="title" mc:hideable>Optional Email Title</h3>
                                                      <div mc:edit="body">
                                                        <p>Header photo should be 720px wide, any height. You can hide the email title above if you like. Use option-Enter to create new paragraphs as opposed to line-breaks. When pasting from other applications such as Microsoft Word use Edit --> Paste and Match Style from the Chrome menu bar.</p>
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                                                      </div>
                                                      <div class="article-list" mc:variant="Article List">
                                                        <div class="article" mc:repeatable>
                                                          <div class="article-image">
                                                            <img mc:edit="article_image" src="https://ipfs.io/ipfs/${image}" style="border-style:none; max-width:475px;" />
                                                          </div>
                                                          <h4 mc:edit="article_title"><a href="#">Edit this title's link</a></h4>
                                                          <p mc:edit="article_content">You can hide this or add additional articles using the buttons below. <a href="#">Read More.</a></p>
                                                        </div>
                                                        <div class="clear"></div>
                                                      <div>
                                                      <div mc:edit="footer">
                                                        <p>Sincerely</p>
                                                        <p>MacGyver</p>
                                                      </div>
                                                    </td>
                                                  </tr>
                                                </table>

                                                <!-- // End Module: Standard Postcard Content \\ -->

                                            </td>
                                        </tr>
                                    </table>
                                    <!-- // End Template Body \\ -->
                                </td>
                            </tr>
                        </table>
                        <br>
                    </td>
                </tr>
                <tr>
                    <td align="center" valign="top">
                          <!-- // Begin Template Footer \\ -->
                        <table border="0" cellpadding="10" cellspacing="0" width="100%" id="templateFooter">
                            <tr>
                                <td valign="top" class="footerContent">

                                      <!-- // Begin Module: Standard Footer \\ -->
                                      <table border="0" cellpadding="0" cellspacing="0" width="100%">

                                          <tr>
                                              <td align="center" id="utility">
                                                  <div mc:edit="std_utility">
                                                    *|LIST:DESCRIPTION|*<br />
                                                  If you no longer wish to receive these emails, please <a href="*|UNSUB|*">click here</a> to unsubscribe.<br>
&copy; <a href="http://www.digital-democracy.org/" target="_blank">Digital Democracy</a> 2014</div>
                                              </td>
                                          </tr>
                                      </table>
                                      <!-- // End Module: Standard Footer \\ -->

                                  </td>
                              </tr>
                          </table>
                          <!-- // End Template Footer \\ -->
                      </td>
                  </tr>
            </table>
        </center>
    </body>
</html>`;
};
