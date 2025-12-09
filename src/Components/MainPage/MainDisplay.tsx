/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
import { useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import { getTrendingMovie } from '../../Hooks/useFetch';
import { useMovies } from '../../Context/MovieContext';
import DetailPage from '../DetailPage';

const MainDisplay = () => {
  const [showDetailPage, setShowDetailPage] = useState<boolean>(false)
  const [detailImage, setDetailImage] = useState<string>("")
  const [detailTitle, setDetailTitle] = useState<string>("")
  const [detailText, setDetailText] = useState<string>("")
  const { movies, setMovies } = useMovies();

  useEffect(() => {
    const getmovies = async () => {
      const data = await getTrendingMovie()
      setMovies(data)
    }
    getmovies()
  }, [])

  // 「何枚ぶん進んだか」を表す値（0〜 images.length - 2）
  const [offset, setOffset] = useState(0);

  // ★ 追加: ビューポート幅を管理
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  // ★ 追加: リサイズ時に viewportWidth を更新
  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ★ 追加: ビューポートに応じて同時表示枚数を変更
  // 690px 以下 → 2枚表示、それ以外 → 3枚表示
  const visibleCount = viewportWidth <= 690 ? 2 : 3;

  useEffect(() => {
    if (movies.length <= 3) return; // no movement if movies are less than 3

    const maxOffset = movies.length - 3;
    const STEP = 0.005; // loop slide speed
    let direction = 1; // 1: to Right, -1: to Left

    const id = window.setInterval(() => {
      setOffset((prev) => {
        let next = prev + STEP * direction;

        // change direction when it arrives left edge
        if (next <= 0) {
          next = 0;
          direction = 1;
        }

        // change direction when it arrives right edge
        if (next >= maxOffset) {
          next = maxOffset;
          direction = -1;
        }

        return next;
      });
    }, 16);
    if (showDetailPage) {
      window.clearInterval(id);
    }
    return () => window.clearInterval(id);
  }, [movies, visibleCount, showDetailPage]);

  const slidePercent = 100 / visibleCount;
  const translateXPercent = -offset * slidePercent;

  const handleShowDetailPage = (title: string, image: string | null, text: string) => {
    setDetailTitle(title)
    if (image) {
      setDetailImage(image)
    }
    if (text) {
      setDetailText(text)
    }
    setShowDetailPage(true)
  }

  return (
    <>
      <Box sx={{ height: "70%", width: "100%", maxWidth: 1200, mx: "auto", overflow: "hidden" }}>
        <Box
          sx={{
            display: "flex",
            transform: `translateX(${translateXPercent}%)`,
            transition: "none",
            willChange: "transform",
            height: "100%",
          }}
        >
          {movies.map((nowPlaying) => (
            <Box
              key={nowPlaying.id}
              sx={{
                flex: `0 0 ${slidePercent}%`,
                height: "100%",
                p: 0.5,
                cursor: "pointer"
              }}
              onClick={() => handleShowDetailPage(nowPlaying.original_title, nowPlaying.poster_path, nowPlaying.overview)}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "80%",
                  borderRadius: 2,
                  overflow: "hidden",
                  bgcolor: "grey.300",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0px 20px 30px -5px"
                }}
              >
                <img src={`https://image.tmdb.org/t/p/w500/${nowPlaying.poster_path}`} alt={String(nowPlaying.id ?? "")} className='w-auto h-full object-cover block' />
              </Box>
              <Box
                sx={{
                  width: "100%",
                  height: "20%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p className='h-full w-full flex justify-center items-center'>{nowPlaying.original_title}</p>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      {showDetailPage && <DetailPage setShowDetailPage={setShowDetailPage} detailImage={detailImage} detailTitle={detailTitle} detailText={detailText} />}
    </>

  );
}

export default MainDisplay
