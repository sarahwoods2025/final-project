Welcome to my README file where I will hopefully explain all about my final project - Study Perks. 

This project idea came to me when I signed up to the Colosseum Brakout hackathon. I realised the painpoint of having to register to third part sites and copy and paste codes to get discounts could be eliminated with tokenisation of student cards. That this could be automated for students, so they never miss out on discounts again. And with that, Study Perks was born. 

I have a Shopify store as well as a website for my art that I will be testing out wallet connection and token recognition to give automated discounts. 

I have made this branch studyperks-eb my default after starting again on my newly created cloud9 and Elastic Beanstalk environment on the 3rd of July, after my previous learner lab expired and took my deployed proof of concept with it. C'est la vie. 

- Frontend: EJS, HTML, CSS (served via Express)
- Backend: Node.js + Express
- Blockchain: Solidity smart contracts (ERC-721), Web3.js
- Verification: Email-based, handled via Nodemailer
- Deployment: AWS Elastic Beanstalk
- Version Control: Git + GitHub

- **What is currently working?**
- 
- My Express server and EJS views are all operating
- The email verification is connected to Nodemailer
- Web3 connection to smart contract
- The studyPerks token is automatically minted to connected wallet upon email verificaiton
- Deployed on Elastic Beanstalk frm my Cloud9 IDE.

- **What is cooking? as of July 3rd?**

- Connecting web3.js to correct website. This is either going to be Shopify or my own deployed static site through my other GitHub.
- Play around with an extension that students can use, so token check can happen off sites, but discounts can be applied from StudyPerks side. This may involve offering our own code to brands instead of an SDK. In the same way UniDays does it, but we're ensuring we do all teh heavy lifting. This is my second option if the SDK doesn't play ball wiht Shopify. 
- Changing the UX of my site. More more towards monochrome.
- Exploring the idea of a doppleganger Soulbound token to allow for another way for brands to connect with students. Offer brand updates to offer additional and maybe timed perks.
- Final testing.


