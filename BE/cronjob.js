const cron = require('cron');
const axios = require('axios')
const Follower = require('./models/Follower')
// const todayReport = require('./excel_report_today');
var a =0
var newJob = () => {
    a += 1;
}

const accessToken ='EAAFFBX64npsBAMNUjyDVZC2ZAIm1AIju7HxtfUrSkLk6IDMWDB7lAMzXhsgUSB4EoaOgeRbKiZAto7hFeYZBbXXRPQIyWYqMN8F2xIzPrQEc2IkYZB68QkZAxZBpIIZB07lggNLnao6JrkpxJYc54YwHblXx5DZCzyH5XnnAKoR0TbZC8ZCqXHACg0BOIxU4W8ND2wYiXZCo8Mf1UbZASrvNOYKpd'
var followers_count


const getFan = async () => {
    const newFollow = {
        a: '1'
    }
    try {
        
        return await axios.get("https://graph.facebook.com/100547109409842", {
            params: {
                access_token: accessToken,
                fields: 'followers_count'
            }
        })
        .then(
            res => {
                const result = res.data;
                console.log(result);
                followers_count=result.followers_count
            }
        )
        return await axios.post("http://localhost:8800/api/post", newFollow);
        
    } catch (err) {}
}


const job = new cron.CronJob({
  cronTime: '*/3 * * * * *', 
  onTick: function() {
    newJob();
    getFan();
    console.log('Cron jub runing...', a, followers_count, new Date);
  },
  start: true, 
  timeZone: 'Asia/Ho_Chi_Minh' // Lưu ý set lại time zone cho đúng 
});

job.start();