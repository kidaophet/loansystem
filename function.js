var express= require('express');
var app= express();
module.exports = function (req, res, next) {

res.sendApi =function balance1(principal, repayment1, discount1){
    const usr=req.body;
        
        const b=balance;
       
        const p= principal;
        const r= repayment1;
        const d= discount1;
        //balance1 table principal
        
            var b = usr.parseFloat(p) - usr.parseFloat(r) + usr.parseFloat(d)
       
            var b1=usr.parseFloat(b)+usr.parseFloat(p)-usr.parseFloat(r)-usr.parseFloat(d)
        
        
        //balance2
        
        res.sendApi({b,b1});
};
next();
};
module.exports = function (req, res, next) {
    res.sendApi =function normal_interest(interest,normal_interest, repayment2, discount2){
       
        const i= interest;
        const ni= normal_interest;
        const r2= repayment2;
        const d2= discount2;
        //balance1 table normal_interest
        ni = usr.parseFloat(p) * usr.parseFloat(i) / 100
        var b = usr.parseFloat(ni) - usr.parseFloat(r2) - usr.parseFloat(d2)
        var b2 = usr.parseFloat(b) + usr.parseFloat(ni) - usr.parseFloat(r2) - usr.parseFloat(d2)
        res.sendApi({ni,b,b2});
             
    };
    
    
    next();
    };




        module.exports = function (req, res, next) {
            res.sendApi =function penalty_interest(principal, interest,  repayment, discount){
               
                const p =principal;
                            
                const i= interest;
                var r3= repayment;
                var d3= discount;
                var pi= parseFloat(p)*parseFloat(i)/100
                //balance1 table normal_interest
                var b = parseFloat(p) - parseFloat(r3) - parseFloat(d3)
                const b3 = parseFloat(b) + parseFloat(pi) - parseFloat(r3) - parseFloat(d3)
                res.json({pi,b,b3});
                     
            };
            
            next();
            };
        
            module.exports = function (req, res, next) {
                res.sendApi =function amount_payable(repayment1,repayment2,repayment3,repayment4,amount_pay, revenue_r, transfer_r ){
                    const usr=req.body;
                            var r=repayment1;
                            var r2= repayment2;
                            var r3= repayment3;
                            var r4= repayment4;
                            var tc=usr.parseFloat(r)+usr.parseFloat(r2)+usr.parseFloat(r3)+usr.parseFloat(r4)
                            // res.json({T});

                            
                            var ap=amount_pay;
                            var tr=transfer_r;
                            var rr= revenue_r;

                            const b=usr.parseFloat(ap)
                            const br=usr.parseFloat(b)-usr.parseFloat(tc)
                            
                            var bap=usr.parseFloat(br)+usr.parseFloat(tr)
                            
                            var rr=usr.parseFloat(tr)-usr.parseFloat(tr)
                            res.json({tc,b,br,bap,tr,rr});
                         
                };
    
        next();
        };
        module.exports = function (req, res, next) {
            res.sendApi =function outstanding_days(){
                var start= new Date('June 21 2018'),
                end= new Date(),
                diff=0,
                days=1000*60*60*24;
                diff=end-start;
                var S= (Math.floor(diff/days)+"days have passed After deadline.");
                    res.sendApi({S});
                         
                };
    
            next();
            };
            module.exports = function (req, res, next) {
                res.sendApi =function interest_receivable(balance,interest_rate,outstanding_days){
                        var b=balance;
                        var ir=interest_rate;
                        var ot=outstanding_days;

                        var ir= parseFloat(b)*parseFloat(ir)*parseFloat(ot)/360
                        res.sendApi({ir});
                };
    
                next();
                };



                module.exports = function (req, res, next) {
                    res.sendApi =function balance_o(balance, interest_re,repayment,discount){
                        var b=balance;
                        
                        var I=interest_re;
                        var r=repayment;
                        var d=discount;
                        
                            var b= parseFloat(I)-parseFloat(r)-parseFloat(d);
                        
                            var bo= parseFloat(b)+parseFloat(I)-parseFloat(r)-parseFloat(d);
                        

                        
                        res.sendApi({b,bo});
                };
                 next();
            };

                          
                
                module.exports = function (req, res, next) {
                    res.sendApi =function transfer_c(repayment1,repayment2,repayment3,repayment4){
                        var r1=repayment1;
                        var r2=repayment2;
                        var r3=repayment3;
                        var r4=repayment4;
                        

                        var t=parseFloat(r1)+parseFloat(r2)+parseFloat(r3)+parseFloat(r4)
                        res.sendApi({t});
                };
                next();
            };


                module.exports = function (req, res, next) {
                    res.sendApi =function balance_r(transfer_c,amount_p){
                        var tc=transfer_c;
                        var ap=amount_p;
                        const br=ap;
                        

                        var br2=parseFloat(br)-parseFloat(tc)
                        res.sendApi({br2});
                };
                next();
            };
            module.exports = function (req, res, next) {
                res.sendApi =function deffered_r(principal,normal_interest,penalty_interest,loan_t,interest_c,transfer_r,revenue_r){
                    var p=principal;
                        var ni=normal_interest;
                        var pi=penalty_interest;
                        var lt=loan_t;
                        var ic=interest_c;
                        var tr=transfer_r;
                        var rr=revenue_r;
                        
                        const dr=parseFloat(p)+parseFloat(ni)+parseFloat(pi)-parseFloat(lt)+parseFloat(ic)-parseFloat(tr)


                        const dr2=parseFloat(dr)-parseFloat(rr)+parseFloat(ic)

                        
                        res.sendApi({dr,dr2});
            };
            next();
        };

        module.exports = function (req, res, next) {
            res.sendApi =function deffered_b(dr,dr2){
                if(dr,dr2>0){
                    res.json({dr,dr2});
                }else
                {
                    console.log('Error!');
                }
        };
        next();
    };




                

                        
    
                   
