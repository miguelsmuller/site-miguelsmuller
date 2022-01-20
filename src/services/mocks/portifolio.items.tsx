export interface PortifolioType {
  title: string
  href: string
  stack: string
  description: string
  image: string
  timestamp: string
}

export default function PortifolioContent() {
  const content: PortifolioType[] = [
    {
      title: 'Iranildo Campo',
      href:'',
      stack: 'WordPress + Nginx + MariaDB',
      description: 'Iranildo campo site',
      image: 'https://images.unsplash.com/photo-1642436381301-e31b17223a5e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&ar=1:1&fit=crop&facepad=4&q=80',
      timestamp: '2/2025'
    },
    {
      title: 'CPOD',
      href: '',
      stack: 'WordPress + Nginx + MariaDB',
      description: 'CPOD',
      image: 'https://images.unsplash.com/photo-1642436381301-e31b17223a5e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&ar=1:1&fit=crop&facepad=4&q=80',
      timestamp: '2/2025'
    },
    {
      title: 'Hotel Müller',
      href: '',
      stack: 'WordPress + Nginx + MariaDB',
      description: 'Hotel Müller',
      image: 'https://images.unsplash.com/photo-1642436381301-e31b17223a5e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&ar=1:1&fit=crop&facepad=4&q=80',
      timestamp: '2/2025'
    },
    {
      title: 'Iranildo Campo',
      href: '',
      stack: 'WordPress + Nginx + MariaDB',
      description: 'Iranildo campo site',
      image: 'https://images.unsplash.com/photo-1642436381301-e31b17223a5e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&ar=1:1&fit=crop&facepad=4&q=80',
      timestamp: '2/2025'
    }
  ]

  return content
}
