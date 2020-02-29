const request = require('request-promise');

const hook = 'https://hooks.slack.com/services/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';

const getData = async function() {
    var json = {
        "clients": [
            {
                "id": "59761c23b30d971669fb42ff",
                "isActive": true,
                "age": 36,
                "name": "Dunlap Hubbard",
                "gender": "male",
                "company": "CEDWARD",
                "email": "dunlaphubbard@cedward.com",
                "phone": "+1 (890) 543-2508",
                "address": "169 Rutledge Street, Konterra, Northern Mariana Islands, 8551"
            },
            {
                "id": "59761c233d8d0f92a6b0570d",
                "isActive": true,
                "age": 24,
                "name": "Kirsten Sellers",
                "gender": "female",
                "company": "EMERGENT",
                "email": "kirstensellers@emergent.com",
                "phone": "+1 (831) 564-2190",
                "address": "886 Gallatin Place, Fannett, Arkansas, 4656"
            },
            {
                "id": "59761c23fcb6254b1a06dad5",
                "isActive": true,
                "age": 30,
                "name": "Acosta Robbins",
                "gender": "male",
                "company": "ORGANICA",
                "email": "acostarobbins@organica.com",
                "phone": "+1 (882) 441-3367",
                "address": "697 Linden Boulevard, Sattley, Idaho, 1035"
            },
            {
                "id": "59761c23acd38891373f3efd",
                "isActive": true,
                "age": 38,
                "name": "Lawrence Morrison",
                "gender": "male",
                "company": "OCTOCORE",
                "email": "lawrencemorrison@octocore.com",
                "phone": "+1 (863) 482-3587",
                "address": "798 Troutman Street, Motley, New Mexico, 216"
            },
            {
                "id": "59761c230a89b90a7f47c8e5",
                "isActive": true,
                "age": 29,
                "name": "Trudy Bennett",
                "gender": "female",
                "company": "XPLOR",
                "email": "trudybennett@xplor.com",
                "phone": "+1 (920) 520-3028",
                "address": "141 Richardson Street, Carrsville, Utah, 5923"
            }
        ]};
    console.log(json);

    return json.clients.map(person => ({
        age: person.age,
        email: person.email,
        name: person.name,
    }));
};

(async function () {
    try {
        const people = await getData();

        const slackBody = {
            text: 'Est-ce que ça marche?',
            attachments: people.map(person => ({
                color:'good',
                text: `*${person.email}* : ${person.name} (${person.age})`
            }))
        };

        const res = await request({
            url: hook,
            method: 'POST',
            body: slackBody,
            json: true
        });

        console.log(res);
    } catch (e) {
        console.log('Error', e);
    }
})();