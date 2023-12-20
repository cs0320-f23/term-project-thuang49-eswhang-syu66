import { test, expect } from "@playwright/test";

test("successfully generating a playlist", async ({
    page,
    }) => {
        await page.goto("http://localhost:3000/auth");
        await page.goto('https://accounts.spotify.com/en/login?continue=https%3A%2F%2Faccounts.spotify.com%2Fauthorize%3Fscope%3Dplaylist-modify-private%26response_type%3Dcode%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A3000%252Ffetch_auth%26state%3D0.24076138699497607%26client_id%3D611754e9a5f14adfabdde1d55224815e');
        await page.getByTestId('login-username').click();
        await page.getByTestId('login-username').fill('amplify.music.team@gmail.com');
        await page.getByTestId('login-username').press('Tab');
        await page.getByTestId('login-password').fill('dropouts');
        await page.getByTestId('login-button').click();
        await expect(page.getByRole('link', { name: 'Amplify' })).toBeVisible()
        const url = page.url()
        const userToken = url.substring(url.indexOf("success=") + 8)
        await page.goto('http://localhost:3000/generate_playlist?userToken=' + userToken + '&songs=spotify:track:1R8kvV2AgNPCA2Pp4Im1Ao,spotify:track:1yampU2t2LNWzEsCpUgHYJ,spotify:track:5yZvaUVyuXfSVUaMumFi6l,spotify:track:4hNjjRYpkftbChRMkRlDeg,spotify:track:0mfHN9LcAPidSI3JCPqYml,spotify:track:26QLJMK8G0M06sk7h7Fkse,spotify:track:3gjRRs7gmh3Euynu1cau1d,spotify:track:5QO79kh1waicV47BqGRL3g,spotify:track:0NZPBYD5qbEWRs3PrGiRkT,spotify:track:2xql0pid3EUwW38AsywxhV,spotify:track:6jDT7DB6k0psPX0nWNDI1K,spotify:track:58U47mHjyLwUwJZ7voUt15,spotify:track:5cw9s2zGrbny2M2p3WRmGm,spotify:track:3pYDZTJM2tVBUhIRifWVzI,spotify:track:4dHdqpGaO9km4TEw9nNQSR,spotify:track:4RVwu0g32PAqgUiJoXsdF8,spotify:track:6NriykdkRrjQMZo1sfVYUo,spotify:track:5xz4NjWqe4bvIqJNzgKKPs,spotify:track:38u74wUfcE5N47L2m9qYrZ,spotify:track:7I4XALvCb2VEmOCtGUe5uY,spotify:track:6XrTwqp0vMc2Z3m4ttoyRe,spotify:track:6K8VQ84MqhsoakN5MjrnVR,spotify:track:2IN4LfVxAojbiLkDQDF0in,spotify:track:0ny5zITdmyNwyTPVzRGscU,spotify:track:1zejeOnykpCoyVSit6Bwp3,spotify:track:0W4NhJhcqKCqEP2GIpDCDq,spotify:track:3A0mdJS6ra4RJ9Eidtz2br,spotify:track:4Ey0LK1HzksUqm9JLzzKuD,spotify:track:3NM41PVVUr0ceootKAtkAj,spotify:track:5gDWsRxpJ2lZAffh5p7K0w,spotify:track:6bj69qAg4JOErXXbWwyKUt,spotify:track:7szhY56rkD20Ai9AxJaicE,spotify:track:3Yvk0ZLxMlt6ioasvdN6vB,spotify:track:2jVqcE5a7GoEEti0OcImc6,spotify:track:03zuGqxMwUFFmCwusq0WKE,spotify:track:3GZD6HmiNUhxXYf8Gch723,spotify:track:0EcQcdcbQeVJn9fknj44Be,spotify:track:3i058E8uxTsYqJ5NWZzqSj,spotify:track:21dpBHPTV7ythCHBI6Slcw,spotify:track:5Y35SjAfXjjG0sFQ3KOxmm,spotify:track:6nCDnzErqalOaIY3EJM8NK,spotify:track:4hMB4hoIBitJLpgad18J6T,spotify:track:33SNO8AaciGbNaQFkxvPrW,spotify:track:32XaqPVTVkkuOiOPQZ3SpA,spotify:track:0AS63m1wHv9n4VVRizK6Hc,spotify:track:2AYEOC02WLhUiOoaig2SEH,spotify:track:18uwL0vNUanqZH0ro2QcOP,spotify:track:45i70K1PefHafKui2WxH0M,spotify:track:5v4OkFH0TJ6W1hCFxyn0px,spotify:track:5dHTdHgcsg1Y4uWrmDpHjO,spotify:track:3uVE5vLKkigiWBOQEgmdDk,spotify:track:2qLSXZuIHMsKydCEFDchc3,spotify:track:0uEp9E98JB5awlA084uaIg,spotify:track:5Q6fh8OEhBYepJaORz9lxe,spotify:track:16nCYYc1lCxCyvaR1lgo0i,spotify:track:6L2uVVPJA9WcDc7zCZ4DHN,spotify:track:2RZWiishrE4Tygv9R7zuZe,spotify:track:6eutgX6jfXAsjTXgQtCtYV,spotify:track:1EO9dn7V0ufwPHJngZThO5,spotify:track:2L9N0zZnd37dwF0clgxMGI,spotify:track:2TOzTqQXNmR2zDJXihjZ2e,spotify:track:3IJCSQoLF4YzPAKaxq2JLb,spotify:track:3e7sxremeOE3wTySiOhGiP,spotify:track:6nzXkCBOhb2mxctNihOqbb,spotify:track:60TThBDrPpek5k520l0W0L,spotify:track:5Nc3vGiiHFyQegUNjsboj9,spotify:track:45wneA2j0Z0WMnYNDO6Ad0,spotify:track:2qluMHRDU94kDT0KnDzpSJ,spotify:track:3Z0qLOS0cqWKPHXkbTXmNF,spotify:track:2eHj0klWkwRQuIrNlPpCPa,spotify:track:45hOioMDJktr86iKDHC8gr,spotify:track:3JTMWdhcJPiegDSe7SvZS3,spotify:track:3U5JVgI2x4rDyHGObzJfNf,spotify:track:4XfSFZLy6MTKK1f18Hb4qm,spotify:track:1E3VQQWFQAPJkXfYHjqWoI,spotify:track:3tJ4y2Zqx6gM9xOAuFfsSF,spotify:track:7s2kWabRM60W9I61HpKg8C,spotify:track:2SSWIysBzyEEPJchLh3LrP,spotify:track:7g5qe8VITjr13RIe8uM2p6,spotify:track:4shULiz3P7luscRsQobtDN,spotify:track:3nef5W8jTkXrOKgCu4kmq7,spotify:track:2enPRFda84VE2wtI8c86Uf,spotify:track:7IL8PSVwLOJxqYne6azxQv,spotify:track:3Tc57t9l2O8FwQZtQOvPXK,spotify:track:4D5xkARyjOvcHb3Z2r4Whe,spotify:track:3oOWBUNbwHZkWF2WND4kK2,spotify:track:4fixebDZAVToLbUCuEloa2,spotify:track:03f7xZmt2wHCIDJBFPK8G4,spotify:track:5jjZikDrEd0by1o7V3fO4y,spotify:track:2TNaQWWTeTyig2wsr1BNaL,spotify:track:0qMAJBLMTshMx03CJkJl6O,spotify:track:7oJ3Nb3LIY1ond1fHF3xio,spotify:track:226PUvIuxGdceSijXXZRRz,spotify:track:5gW5dSy3vXJxgzma4rQuzH,spotify:track:14tud1FLjpHMYHpD2c7NbO,spotify:track:0VF7YLIxSQKyNiFL3X6MmN,spotify:track:0W6I02J9xcqK8MtSeosEXb,spotify:track:193Dm5SqYy3hTSbuzxbwKc,spotify:track:01K4zKU104LyJ8gMb7227B,spotify:track:2ACs0dJwkSsvNZvEbvFurK');
        await expect(page.getByText('{"status":"success","data":"')).toBeVisible();
    });