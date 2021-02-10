import React, { useState, useMemo } from 'react';
import json from 'assets/data/anthemns';
import { Slide } from 'utils';

const AnthemnsContext = React.createContext({});

function AnthemnsProvider({ children }) {
  const anthemns = useMemo(() => {
    return json.map(
      ({ number, title, startsWithChorus, chorus, stanzas, tags }, index) => {
        const slides = [];
        let slideIndex = 0;
        const isNotAnthemn = tags?.toLowerCase().includes('coro');
        const isExtra = tags?.toLowerCase().includes('extra');

        slides.push(
          Slide.create({
            title: `${
              isNotAnthemn ? 'Coro' : `Himno${isExtra ? '' : ` #${number}`}`
            }`,
            text: title,
            index: slideIndex++,
          })
        );

        if (startsWithChorus) {
          slides.push(
            Slide.create({
              title: 'Coro',
              text: chorus,
              index: slideIndex++,
            })
          );
        }

        stanzas.forEach((stanza) => {
          slides.push(
            Slide.create({
              text: stanza,
              index: slideIndex++,
            })
          );

          if (chorus) {
            slides.push(
              Slide.create({
                title: 'Coro',
                text: chorus,
                index: slideIndex++,
              })
            );
          }
        });

        slides.push(
          Slide.create({
            text: 'AMÉN.',
            index: slideIndex++,
          })
        );

        return {
          index,
          number,
          title: `${isNotAnthemn || isExtra ? '' : `#${number} `}${title}`,
          type: 'anthemn',
          slides,
          tags,
          length: slides.length,
        };
      }
    );
  }, []);

  const total = anthemns.length;
  const [first] = anthemns;
  const [song, setSong] = useState(first);
  const [slide, setSlide] = useState(song.slides[0]);

  return (
    <AnthemnsContext.Provider
      value={{
        anthemns,
        song,
        setSong,
        total,
        slide,
        setSlide,
      }}
    >
      {children}
    </AnthemnsContext.Provider>
  );
}

export { AnthemnsProvider, AnthemnsContext };
