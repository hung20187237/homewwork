const cron = require('cron');
const axios = require('axios')


var allaccount
var followers_count


const getFan = async () => {
    const newFollow = {}

    const res = await axios.get("http://localhost:8800/api/account/accountfb")
    allaccount = (
        res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
    )
    allaccount.map( async (acc) => {
        newFollow.userId = acc.userId;
        newFollow.accountId = acc.accountId;
        const accessToken = acc.accessToken
        try {    
            await axios.get("https://graph.facebook.com/100547109409842", {
                params: {
                    access_token: accessToken,
                    fields: 'followers_count'
                }
            })
            .then(       
                res => {
                    const result = res.data;
                    followers_count=result.followers_count
                    newFollow.folowerCount = followers_count
                }
            )
        }catch (err) {
            console.log(err)
        }
        console.log(newFollow)
        try{
            await axios.post("http://localhost:8800/api/follow", newFollow);
        } catch (err) {
            console.log(err)
        }
    })

}


const job = new cron.CronJob({
  cronTime: '0 14 * * *', 
  onTick: function() {
    getFan();
    console.log('Cron jub runing...', a, followers_count, new Date);
  },
  start: true, 
  timeZone: 'Asia/Ho_Chi_Minh' // Lưu ý set lại time zone cho đúng 
});

job.start();