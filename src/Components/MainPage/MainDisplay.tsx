/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
import { useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import { getDataNowPlaying } from '../../Hooks/useFetch';


type ImageItem = {
  id: number;
  src: string;
  alt?: string;
};

// public フォルダ内のダミー画像
const dummyImages: ImageItem[] = [
  { id: 1, src: 'sample1.jpg', alt: 'Sample 1' },
  { id: 2, src: 'sample2.jpg', alt: 'Sample 2' },
  { id: 3, src: 'sample3.jpg', alt: 'Sample 3' },
  { id: 4, src: 'sample3.jpg', alt: 'Sample 3' },
  { id: 5, src: 'sample3.jpg', alt: 'Sample 3' },
];


const MainDisplay = () => {
  const [nowPlayingList, setNowPlayingList] = useState<any[]>([])

  useEffect(() => {
    const getNowPlayingList = async () => {
      const data = await getDataNowPlaying()
      console.log(data)
      setNowPlayingList(data)
    }
    getNowPlayingList()
  }, [])

  // console.log(nowPlayingList)


  // replace with API data later
  const images = dummyImages;

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
    if (images.length <= 3) return; // 2枚だけなら動かさない

    const maxOffset = nowPlayingList.length - 3; // 例: 3枚 → 1, 4枚 → 2
    const STEP = 0.005; // 1回の更新でどれだけ進むか（大きいほど速い）
    let direction = 1; // 1: 右へ, -1: 左へ

    const id = window.setInterval(() => {
      setOffset((prev) => {
        let next = prev + STEP * direction;

        // 左端に着いたら右へ
        if (next <= 0) {
          next = 0;
          direction = 1;
        }

        // 右端に着いたら左へ
        if (next >= maxOffset) {
          next = maxOffset;
          direction = -1;
        }

        return next;
      });
    }, 16); // 約60fps

    return () => window.clearInterval(id);
  }, [nowPlayingList, visibleCount]);

  const slidePercent = 100 / visibleCount;
  const translateXPercent = -offset * slidePercent;

  return (
    <Box sx={{ height: "50%", width: "100%", maxWidth: 1200, mx: "auto", overflow: "hidden" }}>
      {/* 全スライドを横に並べて、translateX で動かす */}
      <Box
        sx={{
          display: "flex",
          transform: `translateX(${translateXPercent}%)`,
          transition: "none", // 自前で位置を変えているので CSS アニメは使わない
          willChange: "transform",
          height: "100%"
        }}
      >
        {nowPlayingList.map((nowPlaying) => (
          <Box
            key={nowPlaying.id}
            // 幅 50% 固定 → 画面に常に2枚表示
            sx={{
              flex: `0 0 ${slidePercent}%`,
              height: "100%",
              p: 0.5,
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "90%",
                borderRadius: 2,
                overflow: "hidden",
                bgcolor: "grey.100",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                component="img"
                src={`https://image.tmdb.org/t/p/w500/${nowPlaying.poster_path}`}
                alt={nowPlaying.id ?? ""}
                sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              {/* <p className='h-[10%] w-full text-center bg-amber-400'>aaaaaaaaaaa</p> */}
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "10%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p className='h-full w-full text-center'>{nowPlaying.original_title}</p>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default MainDisplay