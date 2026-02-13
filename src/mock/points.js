import { getRandomInt } from '../utils.js';

const TRIP_POINTS = [
  {
    'id': 'f0fc5afc-42a2-4bb0-af11-6fed54b48d96',
    'basePrice': getRandomInt(0, 10000),
    'dateFrom': '2019-01-11T00:00:56.845Z',
    'dateTo': '2019-01-21T11:22:13.375Z',
    'destination': '217faae6-5786-4144-9023-f5c60292f9c3',
    'isFavorite': true,
    'offers': [
      'e80482b8-1225-4258-862b-1cfd2bc2be16'
    ],
    'type': 'taxi'
  },
  {
    'id': 'bed2e3e7-901b-4a3e-9fa1-d69904d0222a',
    'basePrice': getRandomInt(0, 10000),
    'dateFrom': '2020-02-21T22:55:56.845Z',
    'dateTo': '2020-02-22T11:22:13.375Z',
    'destination': '6c84adcd-9a22-4af2-a783-20d18a24c68b',
    'isFavorite': false,
    'offers': [
      '96a9e77e-7831-4294-b214-9fc86c1f6850',
      '05cef08e-817c-4a62-954b-652f819566fc'
    ],
    'type': 'bus'
  },
  {
    'id': '56266fee-b057-445e-96d4-83756a5e2407',
    'basePrice': getRandomInt(0, 10000),
    'dateFrom': '2021-03-22T22:55:56.845Z',
    'dateTo': '2021-03-23T10:22:13.375Z',
    'destination': '84e5879f-d376-4cb4-aabe-f40f02215d82',
    'isFavorite': true,
    'offers': [],
    'type': 'train'
  },
  {
    'id': 'e87dde1c-f64a-47b8-a209-28cde621ee83',
    'basePrice': getRandomInt(0, 10000),
    'dateFrom': '2022-04-14T22:55:56.845Z',
    'dateTo': '2022-04-24T11:22:13.375Z',
    'destination': 'b5308537-e234-4901-8661-fa0027d0b23f',
    'isFavorite': false,
    'offers': [],
    'type': 'ship'
  },
  {
    'id': '8cd0d662-e84f-4b3d-9f27-565cf76202fc',
    'basePrice': getRandomInt(0, 10000),
    'dateFrom': '2023-05-15T22:55:56.845Z',
    'dateTo': '2023-05-25T11:22:13.375Z',
    'destination': '8e9d5c7c-a52d-4aca-966f-29bc3aa3d3a7',
    'isFavorite': false,
    'offers': [
      '9748e8a4-1c51-486d-a324-821c3208d44b',
      'aea77bf1-920a-4864-9f87-875df83781c6',
      'a3098fb7-3b3b-4fce-a9c8-fdedb4f52ab8'
    ],
    'type': 'drive'
  },
  {
    'id': 'c5fedbbe-d709-429b-a54f-091ab95c1ea6',
    'basePrice': getRandomInt(0, 10000),
    'dateFrom': '2024-06-20T22:55:56.845Z',
    'dateTo': '2024-06-26T11:22:13.375Z',
    'destination': 'af9bdb03-b807-4f6e-92a5-999ec0779776',
    'isFavorite': false,
    'offers': [
      'ed98a10e-f408-4c8f-9e04-b6b8a76ea346'
    ],
    'type': 'flight'
  },
  {
    'id': '617eb02d-384a-4123-b292-ab720da3fa1c',
    'basePrice': getRandomInt(0, 10000),
    'dateFrom': '2025-07-18T02:55:56.845Z',
    'dateTo': '2025-07-27T11:22:13.375Z',
    'destination': '919d787e-9728-43f6-b3d7-1c7149148d37',
    'isFavorite': true,
    'offers': [],
    'type': 'check-in'
  },
  {
    'id': 'de4fca08-365d-42ba-bf4a-9b0bb398853f',
    'basePrice': getRandomInt(0, 10000),
    'dateFrom': '2026-08-18T22:55:56.845Z',
    'dateTo': '2026-08-28T11:22:13.375Z',
    'destination': '321e336f-c64d-4671-82a2-20b1cec20d5f',
    'isFavorite': false,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': 'bc2ea7d4-dba1-4701-be75-fab132bd3a77',
    'basePrice': getRandomInt(0, 10000),
    'dateFrom': '2027-09-19T22:55:56.845Z',
    'dateTo': '2027-09-29T11:22:13.375Z',
    'destination': 'd519dd4f-8442-42cd-adbe-d0644e341604',
    'isFavorite': true,
    'offers': [
      'ed479171-e009-4e31-a3d3-bd1d3add7b55'
    ],
    'type': 'restaurant'
  }
];

function getAllPoints() {
  return TRIP_POINTS;
}

export {getAllPoints};
