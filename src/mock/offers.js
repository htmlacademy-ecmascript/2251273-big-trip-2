const TYPE_OFFERS = [
  {
    'type': 'taxi',
    'offers': [
      {
        'id': 'e80482b8-1225-4258-862b-1cfd2bc2be16',
        'title': 'Upgrade to a business class taxi',
        'price': 120
      },
      {
        'id': 'c9638bad-89a2-40ec-b434-8f9750c3b701',
        'title': 'Upgrade to a business class 2 taxi',
        'price': 140
      },
      {
        'id': '4211aede-c7a6-4a7b-b658-0615cb1ccc64',
        'title': 'Upgrade to a business class taxi',
        'price': 160
      },
      {
        'id': 'c3c53dc6-ba11-44e6-90df-b88c06bfc399',
        'title': 'Upgrade to a business class 2 taxi',
        'price': 180
      }
    ]
  },
  {
    'type': 'bus',
    'offers': [
      {
        'id': '05cef08e-817c-4a62-954b-652f819566fc',
        'title': 'Upgrade to a business class bus',
        'price': 220
      },
      {
        'id': '96a9e77e-7831-4294-b214-9fc86c1f6850',
        'title': 'Upgrade to a business class bus',
        'price': 240
      },
      {
        'id': '02890417-47d5-472e-b790-b15bda5b87ee',
        'title': 'Upgrade to a business class bus',
        'price': 220
      }
    ]
  },
  {
    'type': 'train',
    'offers': []
  },
  {
    'type': 'ship',
    'offers': [
      {
        'id': '8d2d7e47-d8b4-4147-8b97-a282dfc2ce8c',
        'title': 'Upgrade to a business class ship',
        'price': 420
      }
    ]
  },
  {
    'type': 'drive',
    'offers': [
      {
        'id': '9748e8a4-1c51-486d-a324-821c3208d44b',
        'title': 'Upgrade to a business class ship',
        'price': 520
      },
      {
        'id': 'aea77bf1-920a-4864-9f87-875df83781c6',
        'title': 'Upgrade to a business class ship',
        'price': 540
      },
      {
        'id': 'a3098fb7-3b3b-4fce-a9c8-fdedb4f52ab8',
        'title': 'Upgrade to a business class ship',
        'price': 560
      }
    ]
  },
  {
    'type': 'flight',
    'offers': [
      {
        'id': 'ed98a10e-f408-4c8f-9e04-b6b8a76ea346',
        'title': 'Upgrade to a business class flight',
        'price': 620
      }
    ]
  },
  {
    'type': 'check-in',
    'offers': []
  },
  {
    'type': 'sightseeing',
    'offers': [
      {
        'id': 'b212864b-e47c-4928-8cba-7702ce553c42',
        'title': 'Upgrade to a business class sightseeing',
        'price': 820
      }
    ]
  },
  {
    'type': 'restaurant',
    'offers': [
      {
        'id': 'ed479171-e009-4e31-a3d3-bd1d3add7b55',
        'title': 'Upgrade to a business class restaurant',
        'price': 920
      }
    ]
  }
];

function getOffersByType(type) {
  return TYPE_OFFERS.find((offer) => offer.type === type).offers;
}

export {TYPE_OFFERS, getOffersByType};
