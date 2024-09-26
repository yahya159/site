import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const splitSql = (sql: string) => {
  return sql.split(';').filter(content => content.trim() !== '')
}

async function main() {
  const sql = `

INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('8e4c17df-f592-497b-9609-81807371c625', '1Orland.Tromp31@gmail.com', 'David Wilson', 'https://i.imgur.com/YfJQV5z.png?id=3', 'inv789012', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('b4d1bfa7-b506-4627-b9a7-b93ec97b7a3d', '10Elijah_OHara44@yahoo.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=12', 'inv789012', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('6d9ac5b1-f804-42c0-b83d-d97a4d641807', '19Neoma_Halvorson63@gmail.com', 'Emily Jones', 'https://i.imgur.com/YfJQV5z.png?id=21', 'inv901234', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('b2cf7349-b4c8-45fa-b846-3d685e0d63cb', '28Kiera.Schuster@gmail.com', 'David Wilson', 'https://i.imgur.com/YfJQV5z.png?id=30', 'inv123456', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('67f091e3-8141-452e-a53a-25efc53c7488', '37Graham36@yahoo.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=39', 'inv901234', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('478420c5-0345-40f6-a196-a52fefb7c24b', '46Ray24@yahoo.com', 'Emily Jones', 'https://i.imgur.com/YfJQV5z.png?id=48', 'inv345678', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('0f253192-ee98-49fd-bd29-fd9ad9ababff', '64Twila_Gleason@gmail.com', 'Emily Jones', 'https://i.imgur.com/YfJQV5z.png?id=66', 'inv345678', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('cac9097c-48f6-4b1c-98cf-a65ac8708f3c', '73Michele25@yahoo.com', 'Michael Brown', 'https://i.imgur.com/YfJQV5z.png?id=75', 'inv345678', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('6f8b43d0-7762-4439-9f1b-aa09c7f78902', '82Ruben19@hotmail.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=84', 'inv123456', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('1ea084ad-17be-4cd1-9d49-6ad86723c1a0', 'httpsexample.comnotify4', 'sub_def456', '8e4c17df-f592-497b-9609-81807371c625');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('d94eaa74-3dc1-4b1c-bbcf-62b52461c942', 'httpsexample.comnotify5', 'sub_mno345', '0f253192-ee98-49fd-bd29-fd9ad9ababff');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('2e6104ad-fc41-413e-80fd-84541ee7d81b', 'httpsexample.comnotify3', 'sub_mno345', 'b2cf7349-b4c8-45fa-b846-3d685e0d63cb');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('4f8fa1aa-18ac-491d-aa21-8dd71ede30b6', 'httpsexample.comnotify3', 'sub_jkl012', '67f091e3-8141-452e-a53a-25efc53c7488');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('92e30eb4-5e93-4cbb-b9fe-b8b179a7d9d5', 'httpsexample.comnotify1', 'sub_mno345', '6d9ac5b1-f804-42c0-b83d-d97a4d641807');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('2a319601-3502-4259-9661-c695b3d353f0', 'httpsexample.comnotify1', 'sub_abc123', '6f8b43d0-7762-4439-9f1b-aa09c7f78902');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('8af29b1a-9c07-4769-92d5-d13258015dac', 'httpsexample.comnotify1', 'sub_mno345', '0f253192-ee98-49fd-bd29-fd9ad9ababff');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('84946c03-be6d-4990-b14a-85712ab15a98', 'httpsexample.comnotify5', 'sub_mno345', '6f8b43d0-7762-4439-9f1b-aa09c7f78902');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('de9a1f11-5fc9-4f9e-8139-582a9d3976db', 'httpsexample.comnotify4', 'sub_jkl012', 'b2cf7349-b4c8-45fa-b846-3d685e0d63cb');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('d7c1ccd2-fa14-40e8-9a84-5ca0f466bc8b', 'httpsexample.comnotify3', 'sub_abc123', '6f8b43d0-7762-4439-9f1b-aa09c7f78902');

INSERT INTO "Category" ("id", "name", "description") VALUES ('ddaf8f4e-6e78-400f-8088-344b7f0df59b', 'Fiber Optic Cables', 'Designed for precise measurement and control');
INSERT INTO "Category" ("id", "name", "description") VALUES ('5c63b6d6-bd08-4261-87a5-95bf6b174699', 'Coaxial Cables', 'Used for controlling and regulating electrical systems');
INSERT INTO "Category" ("id", "name", "description") VALUES ('f2794a18-d452-4839-b016-03370d47ed8f', 'Fiber Optic Cables', 'Used for controlling and regulating electrical systems');
INSERT INTO "Category" ("id", "name", "description") VALUES ('3aa52eb2-cc87-4d9d-8b76-1f83518bdf12', 'Fiber Optic Cables', 'Used for transmitting television signals');
INSERT INTO "Category" ("id", "name", "description") VALUES ('49136e26-2cd6-4879-b892-427cd9616b0a', 'Instrumentation Cables', 'Designed for precise measurement and control');
INSERT INTO "Category" ("id", "name", "description") VALUES ('cb03e4f7-f714-47d0-b4a4-b404c2ebaf74', 'Coaxial Cables', 'Suitable for high voltage applications');
INSERT INTO "Category" ("id", "name", "description") VALUES ('5226cf91-33d0-4959-9683-ef02063705eb', 'Fiber Optic Cables', 'Suitable for high voltage applications');
INSERT INTO "Category" ("id", "name", "description") VALUES ('8632326a-64fd-4450-9474-849da541ff09', 'High Voltage Cables', 'Used for controlling and regulating electrical systems');
INSERT INTO "Category" ("id", "name", "description") VALUES ('e3acba5b-74f9-40cc-ba9e-6d3cfc998b69', 'Instrumentation Cables', 'Used for transmitting television signals');
INSERT INTO "Category" ("id", "name", "description") VALUES ('ee4c74dd-86ba-41db-94f5-148aa37adce0', 'Control Cables', 'Designed for precise measurement and control');

INSERT INTO "Company" ("id", "name", "description", "logoUrl") VALUES ('7f64640a-6461-458e-8ff5-1909e8fed577', 'PowerLine Solutions', 'Your partner in reliable and safe electrical connections.', 'https://i.imgur.com/YfJQV5z.png?id=153');
INSERT INTO "Company" ("id", "name", "description", "logoUrl") VALUES ('7f746d83-295a-44a2-9401-52709fb69807', 'WireWorks Co.', 'Innovative solutions for all your cabling needs.', 'https://i.imgur.com/YfJQV5z.png?id=157');
INSERT INTO "Company" ("id", "name", "description", "logoUrl") VALUES ('6001394e-a906-45ae-90de-98bfc503a3ca', 'ElectroCables Inc.', 'Trusted provider of durable and efficient cables.', 'https://i.imgur.com/YfJQV5z.png?id=161');
INSERT INTO "Company" ("id", "name", "description", "logoUrl") VALUES ('d3b74148-522f-4a0f-84b8-51dc8fad4c08', 'ElectroCables Inc.', 'Trusted provider of durable and efficient cables.', 'https://i.imgur.com/YfJQV5z.png?id=165');
INSERT INTO "Company" ("id", "name", "description", "logoUrl") VALUES ('2c10fca7-6fee-4ca2-a12a-18a12338b76e', 'VoltMaster Enterprises', 'Innovative solutions for all your cabling needs.', 'https://i.imgur.com/YfJQV5z.png?id=169');
INSERT INTO "Company" ("id", "name", "description", "logoUrl") VALUES ('a7808649-c7b3-4664-891f-61d3d29b8ae6', 'ElectroCables Inc.', 'Specializing in custom cable designs and installations.', 'https://i.imgur.com/YfJQV5z.png?id=173');
INSERT INTO "Company" ("id", "name", "description", "logoUrl") VALUES ('b378f037-5e3f-4fbb-813f-db29662a8478', 'VoltMaster Enterprises', 'Leading manufacturer of highquality electric cables.', 'https://i.imgur.com/YfJQV5z.png?id=177');
INSERT INTO "Company" ("id", "name", "description", "logoUrl") VALUES ('b8d19247-8954-4c3f-b5f2-1da26f14a3ab', 'CableTech Industries', 'Leading manufacturer of highquality electric cables.', 'https://i.imgur.com/YfJQV5z.png?id=181');
INSERT INTO "Company" ("id", "name", "description", "logoUrl") VALUES ('dc9439d1-19c0-42e1-9eba-8213d8ed0a6a', 'PowerLine Solutions', 'Trusted provider of durable and efficient cables.', 'https://i.imgur.com/YfJQV5z.png?id=185');
INSERT INTO "Company" ("id", "name", "description", "logoUrl") VALUES ('1e1ad40a-ca19-411c-bb21-9c35ad3988a3', 'VoltMaster Enterprises', 'Your partner in reliable and safe electrical connections.', 'https://i.imgur.com/YfJQV5z.png?id=189');

INSERT INTO "Product" ("id", "name", "description", "imageUrl", "categoryId", "companyId") VALUES ('a7dfaa62-9b19-41f1-9c81-37697f31987b', 'Control Cable', 'Ideal for highspeed data transmission with minimal signal loss.', 'https://i.imgur.com/YfJQV5z.png?id=193', 'f2794a18-d452-4839-b016-03370d47ed8f', '2c10fca7-6fee-4ca2-a12a-18a12338b76e');
INSERT INTO "Product" ("id", "name", "description", "imageUrl", "categoryId", "companyId") VALUES ('47e86551-486a-47d4-ba58-4554ff238fde', 'Control Cable', 'Used in industrial settings for controlling machinery and equipment.', 'https://i.imgur.com/YfJQV5z.png?id=197', 'ee4c74dd-86ba-41db-94f5-148aa37adce0', '2c10fca7-6fee-4ca2-a12a-18a12338b76e');
INSERT INTO "Product" ("id", "name", "description", "imageUrl", "categoryId", "companyId") VALUES ('a88750c6-b072-4609-b090-862f1880ffa7', 'High Voltage Cable', 'Designed for network connections offering fast and stable internet.', 'https://i.imgur.com/YfJQV5z.png?id=201', '5226cf91-33d0-4959-9683-ef02063705eb', '6001394e-a906-45ae-90de-98bfc503a3ca');
INSERT INTO "Product" ("id", "name", "description", "imageUrl", "categoryId", "companyId") VALUES ('797444cc-e6ff-440d-8aa4-bce88da79991', 'Coaxial Cable', 'Suitable for high voltage applications ensuring safety and reliability.', 'https://i.imgur.com/YfJQV5z.png?id=205', 'cb03e4f7-f714-47d0-b4a4-b404c2ebaf74', '7f746d83-295a-44a2-9401-52709fb69807');
INSERT INTO "Product" ("id", "name", "description", "imageUrl", "categoryId", "companyId") VALUES ('2aa72248-78d6-4274-b873-886560757f2e', 'Ethernet Cable', 'Suitable for high voltage applications ensuring safety and reliability.', 'https://i.imgur.com/YfJQV5z.png?id=209', '5226cf91-33d0-4959-9683-ef02063705eb', 'b8d19247-8954-4c3f-b5f2-1da26f14a3ab');
INSERT INTO "Product" ("id", "name", "description", "imageUrl", "categoryId", "companyId") VALUES ('bd3bbbc4-ed5d-4615-a428-3a5f37ea9418', 'High Voltage Cable', 'Designed for network connections offering fast and stable internet.', 'https://i.imgur.com/YfJQV5z.png?id=213', '8632326a-64fd-4450-9474-849da541ff09', '7f746d83-295a-44a2-9401-52709fb69807');
INSERT INTO "Product" ("id", "name", "description", "imageUrl", "categoryId", "companyId") VALUES ('fc5bf804-bb87-46dc-ae2c-2340aa6a4bb3', 'Fiber Optic Cable', 'Designed for network connections offering fast and stable internet.', 'https://i.imgur.com/YfJQV5z.png?id=217', 'ddaf8f4e-6e78-400f-8088-344b7f0df59b', 'dc9439d1-19c0-42e1-9eba-8213d8ed0a6a');
INSERT INTO "Product" ("id", "name", "description", "imageUrl", "categoryId", "companyId") VALUES ('fc0012dd-bbda-4133-ba86-25ed65278fda', 'High Voltage Cable', 'Ideal for highspeed data transmission with minimal signal loss.', 'https://i.imgur.com/YfJQV5z.png?id=221', '3aa52eb2-cc87-4d9d-8b76-1f83518bdf12', '1e1ad40a-ca19-411c-bb21-9c35ad3988a3');
INSERT INTO "Product" ("id", "name", "description", "imageUrl", "categoryId", "companyId") VALUES ('755143bc-8759-4a0e-a579-a517884eb35d', 'Ethernet Cable', 'Ideal for highspeed data transmission with minimal signal loss.', 'https://i.imgur.com/YfJQV5z.png?id=225', '3aa52eb2-cc87-4d9d-8b76-1f83518bdf12', 'a7808649-c7b3-4664-891f-61d3d29b8ae6');
INSERT INTO "Product" ("id", "name", "description", "imageUrl", "categoryId", "companyId") VALUES ('1d332817-ca30-4c0d-a005-b7c6c2b06fe3', 'High Voltage Cable', 'Used in industrial settings for controlling machinery and equipment.', 'https://i.imgur.com/YfJQV5z.png?id=229', 'ee4c74dd-86ba-41db-94f5-148aa37adce0', 'dc9439d1-19c0-42e1-9eba-8213d8ed0a6a');

INSERT INTO "Inventory" ("id", "quantity", "lastUpdated", "productId") VALUES ('d7f7db67-343b-4b74-abed-1fd36306807e', 634, '2025-01-05T07:23:45.361Z', 'a88750c6-b072-4609-b090-862f1880ffa7');
INSERT INTO "Inventory" ("id", "quantity", "lastUpdated", "productId") VALUES ('dc9dabc3-1b07-4ca0-bd0f-2173c63ab6d8', 783, '2024-07-15T22:53:16.410Z', '2aa72248-78d6-4274-b873-886560757f2e');
INSERT INTO "Inventory" ("id", "quantity", "lastUpdated", "productId") VALUES ('34c659f8-a6e0-4f14-b2e9-da84a8ee3b19', 451, '2024-09-26T23:31:37.937Z', 'fc0012dd-bbda-4133-ba86-25ed65278fda');
INSERT INTO "Inventory" ("id", "quantity", "lastUpdated", "productId") VALUES ('2d37bff3-493b-4869-90c0-670f0721b065', 365, '2025-07-28T01:46:38.184Z', '797444cc-e6ff-440d-8aa4-bce88da79991');
INSERT INTO "Inventory" ("id", "quantity", "lastUpdated", "productId") VALUES ('d0eb9716-6580-4a0d-b0e3-a5cd501e222b', 663, '2023-10-24T22:26:50.458Z', '2aa72248-78d6-4274-b873-886560757f2e');
INSERT INTO "Inventory" ("id", "quantity", "lastUpdated", "productId") VALUES ('8e59484c-0f0d-4605-80c5-3ff1d9b8f68e', 809, '2025-06-18T18:46:25.286Z', 'a7dfaa62-9b19-41f1-9c81-37697f31987b');
INSERT INTO "Inventory" ("id", "quantity", "lastUpdated", "productId") VALUES ('8ec13012-2217-4566-abc0-84008d3c5641', 0, '2025-07-10T05:29:31.492Z', '755143bc-8759-4a0e-a579-a517884eb35d');
INSERT INTO "Inventory" ("id", "quantity", "lastUpdated", "productId") VALUES ('221290ce-cd96-4212-99ce-3cb91e0d47c3', 533, '2024-02-08T13:59:43.468Z', 'a7dfaa62-9b19-41f1-9c81-37697f31987b');
INSERT INTO "Inventory" ("id", "quantity", "lastUpdated", "productId") VALUES ('249259e1-60eb-413e-b0fd-a305f8688dab', 260, '2025-09-11T12:07:24.342Z', '755143bc-8759-4a0e-a579-a517884eb35d');
INSERT INTO "Inventory" ("id", "quantity", "lastUpdated", "productId") VALUES ('23030fa8-14ad-41fc-b4af-425513864687', 952, '2024-09-27T18:17:10.957Z', 'bd3bbbc4-ed5d-4615-a428-3a5f37ea9418');

INSERT INTO "Pricing" ("id", "price", "startDate", "endDate", "productId") VALUES ('c30e20d0-e31c-46b5-93db-2a0c99f1f2e0', '120.50', '2025-08-20T04:09:27.225Z', '2024-11-19T06:34:28.102Z', 'a88750c6-b072-4609-b090-862f1880ffa7');
INSERT INTO "Pricing" ("id", "price", "startDate", "endDate", "productId") VALUES ('742670de-c651-4add-81f0-9be4d2df37e3', '75.25', '2024-10-30T10:02:00.444Z', '2025-06-01T00:05:43.272Z', '2aa72248-78d6-4274-b873-886560757f2e');
INSERT INTO "Pricing" ("id", "price", "startDate", "endDate", "productId") VALUES ('a3ddc1ef-662f-41d1-9198-8e370783e61f', '120.50', '2023-12-01T01:16:24.964Z', '2024-03-05T19:01:50.720Z', 'a88750c6-b072-4609-b090-862f1880ffa7');
INSERT INTO "Pricing" ("id", "price", "startDate", "endDate", "productId") VALUES ('31a95a6f-f8b3-4228-986c-42267dccd528', '200.00', '2024-09-12T00:10:21.291Z', '2025-07-28T22:18:55.520Z', 'a88750c6-b072-4609-b090-862f1880ffa7');
INSERT INTO "Pricing" ("id", "price", "startDate", "endDate", "productId") VALUES ('895ffa61-79e9-46f6-9dd2-4613dbda00ab', '150.00', '2025-05-01T20:51:31.976Z', '2025-01-13T06:49:15.355Z', '2aa72248-78d6-4274-b873-886560757f2e');
INSERT INTO "Pricing" ("id", "price", "startDate", "endDate", "productId") VALUES ('bc822551-abf4-4cd1-8e45-325c8d71baae', '150.00', '2024-01-04T15:14:27.393Z', '2024-10-16T01:19:40.041Z', 'bd3bbbc4-ed5d-4615-a428-3a5f37ea9418');
INSERT INTO "Pricing" ("id", "price", "startDate", "endDate", "productId") VALUES ('857089bc-7804-4088-beef-eb7ce1240c3f', '89.99', '2024-03-21T01:17:03.620Z', '2023-10-30T05:27:40.756Z', '797444cc-e6ff-440d-8aa4-bce88da79991');
INSERT INTO "Pricing" ("id", "price", "startDate", "endDate", "productId") VALUES ('e8a007fc-d6a4-4707-a374-682b5a6435f8', '120.50', '2024-02-19T15:19:14.636Z', '2024-06-06T08:22:18.150Z', 'fc5bf804-bb87-46dc-ae2c-2340aa6a4bb3');
INSERT INTO "Pricing" ("id", "price", "startDate", "endDate", "productId") VALUES ('df48f7e3-124e-4584-8aa2-fdd254a2192c', '200.00', '2024-05-11T13:05:38.187Z', '2024-06-01T13:44:11.975Z', '1d332817-ca30-4c0d-a005-b7c6c2b06fe3');
INSERT INTO "Pricing" ("id", "price", "startDate", "endDate", "productId") VALUES ('c7c60f0a-b8d2-4509-ade9-585a32103c8a', '200.00', '2025-07-18T22:00:04.716Z', '2023-11-15T13:42:11.482Z', '47e86551-486a-47d4-ba58-4554ff238fde');

INSERT INTO "Order" ("id", "orderDate", "status", "totalAmount", "userId") VALUES ('b01ab692-6ac6-48ff-bbed-e13f9b2efc64', '2025-01-03T06:00:24.657Z', 'Shipped', '9800.00', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Order" ("id", "orderDate", "status", "totalAmount", "userId") VALUES ('2c1bebe8-75c3-48ff-9856-f890ea972731', '2025-05-07T20:23:48.594Z', 'Cancelled', '1250.25', 'cac9097c-48f6-4b1c-98cf-a65ac8708f3c');
INSERT INTO "Order" ("id", "orderDate", "status", "totalAmount", "userId") VALUES ('cc57a332-ff01-4e21-b670-3f587be1f10e', '2025-08-11T08:39:32.427Z', 'Delivered', '1500.00', '67f091e3-8141-452e-a53a-25efc53c7488');
INSERT INTO "Order" ("id", "orderDate", "status", "totalAmount", "userId") VALUES ('5e8a048e-f903-4ec6-933f-132dd84c9e11', '2024-02-27T21:58:16.000Z', 'Shipped', '9800.00', '8e4c17df-f592-497b-9609-81807371c625');
INSERT INTO "Order" ("id", "orderDate", "status", "totalAmount", "userId") VALUES ('5bf48ca3-bb5a-4ecb-baf7-72c8abddaebc', '2024-10-07T01:10:35.043Z', 'Pending', '3200.50', '67f091e3-8141-452e-a53a-25efc53c7488');
INSERT INTO "Order" ("id", "orderDate", "status", "totalAmount", "userId") VALUES ('c9c86759-ecb6-4c6a-826b-088d97af4d8f', '2025-06-08T02:45:50.792Z', 'Cancelled', '3200.50', '6f8b43d0-7762-4439-9f1b-aa09c7f78902');
INSERT INTO "Order" ("id", "orderDate", "status", "totalAmount", "userId") VALUES ('0eff0f3c-4d0c-4c4b-a349-0a9072da6cb6', '2025-07-27T01:52:03.914Z', 'Pending', '9800.00', '8e4c17df-f592-497b-9609-81807371c625');
INSERT INTO "Order" ("id", "orderDate", "status", "totalAmount", "userId") VALUES ('6cc6aed6-f92a-4386-9e4b-79e722f4131f', '2024-03-03T10:25:09.322Z', 'Processing', '1500.00', '6f8b43d0-7762-4439-9f1b-aa09c7f78902');
INSERT INTO "Order" ("id", "orderDate", "status", "totalAmount", "userId") VALUES ('47f00461-d2ee-4381-a11a-92f66240fcee', '2023-12-17T07:10:26.022Z', 'Cancelled', '9800.00', '6d9ac5b1-f804-42c0-b83d-d97a4d641807');
INSERT INTO "Order" ("id", "orderDate", "status", "totalAmount", "userId") VALUES ('23a3e878-62c3-4e4d-9589-2e9d44ac0cbe', '2025-07-31T18:46:15.341Z', 'Shipped', '450.75', 'b4d1bfa7-b506-4627-b9a7-b93ec97b7a3d');

INSERT INTO "OrderItem" ("id", "quantity", "price", "orderId", "productId") VALUES ('06d449bd-cc0f-431f-91fa-034c32b86f3c', 823, '250.50', '47f00461-d2ee-4381-a11a-92f66240fcee', '797444cc-e6ff-440d-8aa4-bce88da79991');
INSERT INTO "OrderItem" ("id", "quantity", "price", "orderId", "productId") VALUES ('30270079-9a24-4171-a4ec-0c4f0d68b11b', 443, '250.50', '47f00461-d2ee-4381-a11a-92f66240fcee', '755143bc-8759-4a0e-a579-a517884eb35d');
INSERT INTO "OrderItem" ("id", "quantity", "price", "orderId", "productId") VALUES ('dcaa04eb-0ab9-48fd-a02c-039336ce4d8b', 514, '100.00', 'cc57a332-ff01-4e21-b670-3f587be1f10e', '2aa72248-78d6-4274-b873-886560757f2e');
INSERT INTO "OrderItem" ("id", "quantity", "price", "orderId", "productId") VALUES ('55f15223-968c-44a6-86ea-05a5fd42946b', 967, '100.00', '0eff0f3c-4d0c-4c4b-a349-0a9072da6cb6', 'fc0012dd-bbda-4133-ba86-25ed65278fda');
INSERT INTO "OrderItem" ("id", "quantity", "price", "orderId", "productId") VALUES ('42afaf38-7582-4e08-aea2-a121b0442a0f', 424, '250.50', 'c9c86759-ecb6-4c6a-826b-088d97af4d8f', 'bd3bbbc4-ed5d-4615-a428-3a5f37ea9418');
INSERT INTO "OrderItem" ("id", "quantity", "price", "orderId", "productId") VALUES ('4ba7f966-1935-496f-b6b8-9d286e8f3edf', 958, '100.00', '47f00461-d2ee-4381-a11a-92f66240fcee', '797444cc-e6ff-440d-8aa4-bce88da79991');
INSERT INTO "OrderItem" ("id", "quantity", "price", "orderId", "productId") VALUES ('c8cc7141-fa48-4eb9-bea1-bb1e60fe23d8', 429, '1000.25', '5bf48ca3-bb5a-4ecb-baf7-72c8abddaebc', '2aa72248-78d6-4274-b873-886560757f2e');
INSERT INTO "OrderItem" ("id", "quantity", "price", "orderId", "productId") VALUES ('46a76e3a-ac96-4c02-8117-079cefbacc0d', 896, '750.00', 'cc57a332-ff01-4e21-b670-3f587be1f10e', '1d332817-ca30-4c0d-a005-b7c6c2b06fe3');
INSERT INTO "OrderItem" ("id", "quantity", "price", "orderId", "productId") VALUES ('0f8a7c2c-c2b4-4258-abe2-da4d5c5eea07', 935, '100.00', '2c1bebe8-75c3-48ff-9856-f890ea972731', 'bd3bbbc4-ed5d-4615-a428-3a5f37ea9418');
INSERT INTO "OrderItem" ("id", "quantity", "price", "orderId", "productId") VALUES ('e044bfbf-436a-44b5-b79e-5d9334e37e8e', 997, '750.00', '47f00461-d2ee-4381-a11a-92f66240fcee', '797444cc-e6ff-440d-8aa4-bce88da79991');

INSERT INTO "Review" ("id", "rating", "comment", "createdAt", "userId", "productId") VALUES ('f57a2701-7f8a-44c4-a85f-c700f86306e8', 98, 'Affordable prices but the delivery was delayed.', '2025-07-01T07:47:16.509Z', 'b4d1bfa7-b506-4627-b9a7-b93ec97b7a3d', '1d332817-ca30-4c0d-a005-b7c6c2b06fe3');
INSERT INTO "Review" ("id", "rating", "comment", "createdAt", "userId", "productId") VALUES ('d024291e-0293-46f8-9b9b-4eb9a5919faa', 70, 'Not happy with the product it stopped working after a week.', '2023-10-05T15:04:04.332Z', '478420c5-0345-40f6-a196-a52fefb7c24b', 'a88750c6-b072-4609-b090-862f1880ffa7');
INSERT INTO "Review" ("id", "rating", "comment", "createdAt", "userId", "productId") VALUES ('0b963378-0a00-48a1-a66e-198dc1208cbf', 272, 'The cables work fine but the packaging was damaged.', '2025-09-24T10:33:21.362Z', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'bd3bbbc4-ed5d-4615-a428-3a5f37ea9418');
INSERT INTO "Review" ("id", "rating", "comment", "createdAt", "userId", "productId") VALUES ('97d0866e-a095-4f59-be7a-addd4ac71dc1', 360, 'The cables work fine but the packaging was damaged.', '2023-10-18T13:02:53.464Z', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'a88750c6-b072-4609-b090-862f1880ffa7');
INSERT INTO "Review" ("id", "rating", "comment", "createdAt", "userId", "productId") VALUES ('47b33907-441a-4931-a7d2-027f310281e2', 654, 'The cables work fine but the packaging was damaged.', '2025-01-03T08:00:21.001Z', 'b4d1bfa7-b506-4627-b9a7-b93ec97b7a3d', '755143bc-8759-4a0e-a579-a517884eb35d');
INSERT INTO "Review" ("id", "rating", "comment", "createdAt", "userId", "productId") VALUES ('da58641d-f826-4241-a6a8-072ba77e4848', 118, 'Fast delivery and excellent customer service.', '2024-12-07T11:47:21.790Z', '6d9ac5b1-f804-42c0-b83d-d97a4d641807', 'fc5bf804-bb87-46dc-ae2c-2340aa6a4bb3');
INSERT INTO "Review" ("id", "rating", "comment", "createdAt", "userId", "productId") VALUES ('31d39277-5105-4ace-81ed-91629ffb816b', 818, 'Not happy with the product it stopped working after a week.', '2025-08-22T22:14:58.547Z', '478420c5-0345-40f6-a196-a52fefb7c24b', 'a7dfaa62-9b19-41f1-9c81-37697f31987b');
INSERT INTO "Review" ("id", "rating", "comment", "createdAt", "userId", "productId") VALUES ('3eba5671-dd7c-476c-a973-55adc85dd72c', 335, 'Affordable prices but the delivery was delayed.', '2025-03-27T17:02:46.122Z', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '797444cc-e6ff-440d-8aa4-bce88da79991');
INSERT INTO "Review" ("id", "rating", "comment", "createdAt", "userId", "productId") VALUES ('acb30c7d-fece-4efe-9b15-d2d025b7876d', 191, 'Great quality cables very satisfied', '2024-03-18T00:02:49.656Z', 'cac9097c-48f6-4b1c-98cf-a65ac8708f3c', 'fc0012dd-bbda-4133-ba86-25ed65278fda');
INSERT INTO "Review" ("id", "rating", "comment", "createdAt", "userId", "productId") VALUES ('24e51bbf-20fa-476e-9526-3c215b337d20', 301, 'Not happy with the product it stopped working after a week.', '2024-05-25T09:38:05.804Z', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'a88750c6-b072-4609-b090-862f1880ffa7');

  `

  const sqls = splitSql(sql)

  for (const sql of sqls) {
    try {
      await prisma.$executeRawUnsafe(`${sql}`)
    } catch (error) {
      console.log(`Could not insert SQL: ${error.message}`)
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
