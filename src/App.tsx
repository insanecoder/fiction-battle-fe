import { useCallback, useState } from 'react'
import { HeaderComponent } from './components/header/HeaderComponent'
import { HeroComponent } from './components/hero/HeroComponent'
import FilterSelectionComponent from './components/posts/FilterSelectionComponent'
import { PostComponent, type PostsFilter } from './components/posts/PostComponent'
import AnalyticsComponent from './components/analytics/AnalyticsComponent'
import ToastContainer from './components/ToastContainer'
import { Footer } from './components/Footer'

function App() {
  const [filter, setFilter] = useState<PostsFilter>({});
  const handleFilterChange = useCallback((f: PostsFilter) => setFilter(f), []);

  return <>
    <ToastContainer />
    <HeaderComponent></HeaderComponent>
    <div className='max-w-6xl flex flex-col m-auto pb-24'>
      <HeroComponent></HeroComponent>
      <AnalyticsComponent></AnalyticsComponent>
      <FilterSelectionComponent onFilterChange={handleFilterChange} />
      <PostComponent filter={filter} />
    </div>
    <Footer />
  </>
}

export default App
