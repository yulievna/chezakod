import { ref } from 'vue';

interface Lounge {
  id: number;
  image: string;
  address: string;
  price: string;
  players: string;
}

export const useLounges = () => {
  const lounges = ref<Lounge[]>([
    {
      id: 1,
      image: 'src/assets/lounge__1.jpg',
      address: 'ул. Алексеева, 113',
      price: 'от 1500 ₽/час',
      players: '2-6',
    },
    {
      id: 2,
      image: 'src/assets/lounge__2.jpg',
      address: 'ул. Ленина, 45',
      price: 'от 2000 ₽/час',
      players: '4-8',
    },
    {
      id: 3,
      image: 'src/assets/lounge__3.jpg',
      address: 'ул. Пушкина, 10',
      price: 'от 1800 ₽/час',
      players: '3-5',
    },
    {
      id: 4,
      image: 'src/assets/lounge__4.jpg',
      address: 'ул. Пушкина, 10',
      price: 'от 1800 ₽/час',
      players: '3-5',
    },
    {
      id: 5,
      image: 'src/assets/lounge__5.jpg',
      address: 'ул. Пушкина, 10',
      price: 'от 1800 ₽/час',
      players: '3-5',
    },
    {
      id: 6,
      image: 'src/assets/lounge__6.jpg',
      address: 'ул. Пушкина, 10',
      price: 'от 1800 ₽/час',
      players: '3-5',
    }
  ]);

  return {
    lounges
  };
}; 