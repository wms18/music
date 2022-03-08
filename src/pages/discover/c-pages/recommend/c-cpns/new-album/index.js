/*
 * @Descripttion:
 * @version: X3版本
 * @Author: 吴毛三
 * @Date: 2021-11-24 14:31:02
 * @LastEditors: 吴毛三
 * @LastEditTime: 2022-03-06 23:32:38
 */
import React, { useEffect, useRef, memo } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getAlbum } from "../../store/actionCreators";
import { Carousel } from "antd";
import HYThemeHeaderRCM from "@/components/theme-header-rcm";
import HYAlbumCover from "@/components/album-cover";
import { AlbumWrapper } from "./style";
export default memo(function HYNewAlbum(props) {
  // redux
  const state = useSelector(
    (state) => ({
      newAlbum: state.getIn(["recommend", "newAlbum"]),
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  // hooks
  const carouselRef = useRef();
  useEffect(() => {
    dispatch(getAlbum());
  }, [dispatch]);

  return (
    <AlbumWrapper>
      <HYThemeHeaderRCM title="新碟上架" moreLink="/discover/album" />
      <div className="content">
        <div
          className="arrow arrow-left sprite_02"
          onClick={(e) => carouselRef.current.prev()}
        ></div>
        <div className="album">
          <Carousel ref={carouselRef} dots={false}>
            {[0, 1].map((item) => {
              return (
                <div key={item} className="page">
                  {state.newAlbum
                    .slice(item * 5, (item + 1) * 5)
                    .map((item) => {
                      return <HYAlbumCover key={item.id} info={item} />;
                    })}
                </div>
              );
            })}
          </Carousel>
        </div>
        <div
          className="arrow arrow-right sprite_02"
          onClick={(e) => carouselRef.current.next()}
        ></div>
      </div>
    </AlbumWrapper>
  );
});
