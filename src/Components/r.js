const allStores = [
    {
      "id": "f1a31772-3e3b-4a77-9188-8b142f1b0d1a12",
      "user_id": "c2hvcGFkbWluNUBleGFtcGxlLmNvbQ==",
      "name": "Shop Test",
      "shop_admin_email": "shopadmin5@example.com",
      "location": {
        "lat": "13.0220500",
        "lon": "80.2423200"
      },
      "address": "123 Alpha Street, City A, Country",
      "contact_no": "+10000000001",
      "kontor_server": "kontor1",
      "status": "open",
      "environment": "demo",
      "orgnumber": "123456789",
      "paymentMethod": {},
      "tawShop": "",
      "pkg": {},
      "instructions": [],
      "verification_methods": {},
      "created": "2024-12-06T05:09:26.993Z",
      "updated": "2024-12-25T04:50:03.529Z"
    },
    {
      "id": "f1a31772-3e3b-4a77-9188-8b142f1b0d1a",
      "user_id": "c2hvcGFkbWluMUBleGFtcGxlLmNvbQ==",
      "name": "Shop Alpha",
      "shop_admin_email": "shopadmin1@example.com",
      "location": {
        "lat": "37.7749",
        "lon": "-122.4194"
      },
      "address": "123 Alpha Street, City A, Country",
      "contact_no": "+10000000001",
      "kontor_server": "kontor1",
      "status": "open",
      "environment": "demo",
      "orgnumber": "123456789",
      "paymentMethod": {},
      "tawShop": "",
      "pkg": {},
      "instructions": [],
      "verification_methods": {},
      "created": "2024-11-21T17:58:31.904Z",
      "updated": "2024-12-25T04:50:03.530Z"
    },
    {
      "id": "e1cb45d5-4a53-4e9b-b05d-c3e63163f239",
      "user_id": "c2hvcGFkbWluM0BleGFtcGxlLmNvbQ==",
      "name": "Shop Gamma",
      "shop_admin_email": "shopadmin3@example.com",
      "location": {
        "lat": "51.5074",
        "lon": "-0.1278"
      },
      "address": "789 Gamma Avenue, City C, Country",
      "contact_no": "+10000000003",
      "kontor_server": "kontor3",
      "status": "closed",
      "environment": "demo",
      "orgnumber": "192837465",
      "paymentMethod": {},
      "tawShop": "",
      "pkg": {},
      "instructions": [],
      "verification_methods": {},
      "created": "2024-11-21T17:58:31.189Z",
      "updated": "2024-12-25T04:50:03.530Z"
    },
    {
      "id": "e0bfa98f-e89a-4d32-b899-32b5b662be22",
      "user_id": "c2hvcGFkbWluMkBleGFtcGxlLmNvbQ==",
      "name": "Shop Eta",
      "shop_admin_email": "shopadmin2@example.com",
      "location": {
        "lat": "55.7558",
        "lon": "37.6173"
      },
      "address": "123 Eta Street, City G, Country",
      "contact_no": "+10000000007",
      "kontor_server": "kontor7",
      "status": "closed",
      "environment": "demo",
      "orgnumber": "918273645",
      "paymentMethod": {},
      "tawShop": "",
      "pkg": {},
      "instructions": [],
      "verification_methods": {},
      "created": "2024-11-21T17:58:31.241Z",
      "updated": "2024-12-25T04:50:03.531Z"
    },
    {
      "id": "d6a41b99-dbd1-47bc-b13d-764451b1b048",
      "user_id": "c2hvcGFkbWluM0BleGFtcGxlLmNvbQ==",
      "name": "Shop Theta",
      "shop_admin_email": "shopadmin3@example.com",
      "location": {
        "lat": "35.6895",
        "lon": "139.6917"
      },
      "address": "456 Theta Road, City H, Country",
      "contact_no": "+10000000008",
      "kontor_server": "kontor8",
      "status": "open",
      "environment": "demo",
      "orgnumber": "123876459",
      "paymentMethod": {},
      "tawShop": "",
      "pkg": {},
      "instructions": [],
      "verification_methods": {},
      "created": "2024-11-21T17:58:31.175Z",
      "updated": "2024-12-25T04:50:03.534Z"
    },
    {
      "id": "ad86d041-3685-4b55-9337-64c2c912ff7e",
      "user_id": "c2hvcGFkbWluNEBleGFtcGxlLmNvbQ==",
      "name": "Shop Delta",
      "shop_admin_email": "shopadmin4@example.com",
      "location": {
        "lat": "48.8566",
        "lon": "2.3522"
      },
      "address": "123 Delta Blvd, City D, Country",
      "contact_no": "+10000000004",
      "kontor_server": "kontor4",
      "status": "open",
      "environment": "demo",
      "orgnumber": "564738291",
      "paymentMethod": {},
      "tawShop": "",
      "pkg": {},
      "instructions": [],
      "verification_methods": {},
      "created": "2024-11-21T17:58:31.532Z",
      "updated": "2024-12-25T04:50:03.535Z"
    },
    {
      "id": "ab25680f-916c-4b25-98cf-02cba5d2c8fa",
      "user_id": "c2hvcGFkbWluMUBleGFtcGxlLmNvbQ==",
      "name": "Shop Zeta",
      "shop_admin_email": "shopadmin1@example.com",
      "location": {
        "lat": "11.731569",
        "lon": "77.877648"
      },
      "address": "789 Zeta Plaza, City h, Country",
      "contact_no": "+10000000006",
      "kontor_server": "kontor6",
      "status": "open",
      "environment": "demo",
      "orgnumber": "182736451",
      "paymentMethod": {
        "swish": {
          "payeeAlias": 111111
        }
      },
      "searchText": "shop zeta#shopadmin1@example.com#789 zeta plaza, city h, country",
      "tawShop": "",
      "pkg": {},
      "instructions": [
        "Remove Makeup & any Accessories.",
        "You may want to remove your Contact Lenses.",
        "Disrobe, you may tan in swimwear, underwear or as you chose",
        "Apply your Favorite Indoor Tanning potion. Baby oil and other Outdoor products may not be used on sunbeds.",
        "Please wear the protective eyewear provided.",
        "While tanning, you simply lay back, relax, listen to music or sleep. Your bed will automatically turn off at the proper time.",
        "Apply your favorite after tan or moisturizer",
        "After tanning please dress immediately. Make sure to take all personal items with you. You may freshen up and re-apply makeup at our vanity."
      ],
      "verification_methods": {},
      "created": "2024-12-20T06:09:40.025Z",
      "updated": "2025-02-07T04:13:58.481Z"
    },
    {
      "id": "9c1f1a17-ec46-4f34-a30b-473ff50c2f67",
      "user_id": "c2hvcGFkbWluNUBleGFtcGxlLmNvbQ==",
      "name": "Shop Kappa",
      "shop_admin_email": "shopadmin5@example.com",
      "location": {
        "lat": "28.6139",
        "lon": "77.209"
      },
      "address": "123 Kappa Lane, City J, Country",
      "contact_no": "+10000000010",
      "kontor_server": "kontor10",
      "status": "preparation",
      "environment": "demo",
      "orgnumber": "758392016",
      "paymentMethod": {
        "swish": {
          "payeeAlias": 897
        }
      },
      "searchText": "shop kappa#shopadmin5@example.com#123 kappa lane, city j, country",
      "tawShop": "",
      "pkg": {},
      "instructions": [],
      "verification_methods": {},
      "created": "2024-11-21T17:58:31.787Z",
      "updated": "2025-01-08T11:27:27.534Z"
    },
    {
      "id": "8a6a987f-9a4a-42b2-89f1-cb5c9b745a24",
      "user_id": "c2hvcGFkbWluNEBleGFtcGxlLmNvbQ==",
      "name": "Shop Iota",
      "shop_admin_email": "shopadmin4@example.com",
      "location": {
        "lat": "13.010261",
        "lon": "80.110278"
      },
      "address": "789 Iota Ave, City I, Country",
      "contact_no": "+10000000009",
      "kontor_server": "kontor9",
      "status": "closed",
      "environment": "demo",
      "orgnumber": "984561230",
      "paymentMethod": {},
      "searchText": "shop iota#shopadmin4@example.com#789 iota ave, city i, country",
      "tawShop": "",
      "pkg": {},
      "instructions": [],
      "verification_methods": {
        "bankId_verify": false
      },
      "created": "2024-11-21T17:58:31.518Z",
      "updated": "2025-01-21T11:13:19.402Z"
    },
    {
      "id": "6336e34d19fd3f22b8b45a46",
      "user_id": "c2FzaWRoYXJhbmFsYWdlc2FuQGdtYWlsLmNvbQ==",
      "name": "Shop 2",
      "shop_admin_email": "sasidharanalagesan@gmail.com",
      "location": {
        "lat": "59.33287",
        "lon": "18.06219"
      },
      "address": "address 2",
      "contact_no": "987654321",
      "kontor_server": "kontor2",
      "status": "open",
      "environment": "demo",
      "orgnumber": "51684",
      "paymentMethod": {
        "swish": {
          "payeeAlias": 1235158290
        }
      },
      "searchText": "shop 2#sasidharanalagesan@gmail.com#address 2",
      "tawShop": "",
      "pkg": {},
      "instructions": [],
      "verification_methods": {},
      "created": "2024-11-21T17:58:31.675Z",
      "updated": "2024-12-25T04:50:03.538Z"
    }
  ]