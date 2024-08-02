import { useSelector } from 'react-redux';
import CocktailsServer from '@/components/Cocktails/CocktailsServer';

export default function Home() {
  const searchQuery = useSelector((state) => state.cocktail.searchQuery);

  return (
    <main>
      <CocktailsServer searchQuery={searchQuery} />
    </main>
  );
}
