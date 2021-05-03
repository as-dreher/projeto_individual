'use strict';

var server = require('server');


server.get('Landing', server.middleware.https, function (req, res, next) {
    var URLUtils = require('dw/web/URLUtils');
    var cadastroForn = server.forms.getForm('cadastroForn');
    res.render('/cadastroForn/cadastroForn', {
        actionUrl: URLUtils.url('Cadastro-Subscribe').toString(),
        cadastroForn: cadastroForn
    });
    next();
});


server.post('Subscribe', server.middleware.https, function (req, res, next) {
    var Resource = require('dw/web/Resource');
    var contactForm = server.forms.getForm('cadastroForn');
    var emailHelper = require('*/cartridge/scripts/helpers/emailHelpers');
    var myForm = req.form;
    var customObjMgr = require('dw/object/CustomObjectMgr');
    var txn = require('dw/system/Transaction');
    txn.begin();
    try{
        var newSubscribe = customObjMgr.createCustomObject('CadastroFornAD', myForm.email);
        newSubscribe.custom.email = myForm.email;
        newSubscribe.custom.name = myForm.name;
        newSubscribe.custom.phone = myForm.phone;
        newSubscribe.custom.cnpj = myForm.cnpj;
        newSubscribe.custom.message = myForm.message;
        var contactDetails = [myForm.name, myForm.email, myForm.phone, myForm.cnpj, myForm.message];

        /*res.json({
            success: true,
            msg: Resource.msg('subscribe.to.contact.us.success', 'contact', null)
        });*/

        res.render('/cadastroForn/mensagemSucess', {
            MyForm: myForm
        });
    }catch(e) {

        txn.rollback();
       }

    next();
});
module.exports = server.exports();
