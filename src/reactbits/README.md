# React Bits components

These are the JS + CSS versions of components from React Bits (https://reactbits.dev),
copied unmodified from https://github.com/DavidHDev/react-bits at commit
a30a9da9b40a91c5672fc8cd77785719e8e5b1e6 (src/content). Licence: MIT + Commons Clause, see LICENSE.md.

| Component | Used for |
|---|---|
| SplitText | The Home hero heading |
| AccordionGallery | The 9th floor on Home: photos that open on hover (desktop) or tap (phone) |
| CurvedLoop | The "Live. Work. Stay." band under the Home hero; visitors can drag it |
| BounceCards | The fan of photos in the Home hotel section |
| StarBorder | The coral light round the main WhatsApp buttons on Home |
| SpotlightCard | The rate cards on Home |
| FadeContent | Short fades on section intros below the Home fold and on Amenities |

They load as separate files after the page first paints, and the ones below the fold only when the visitor scrolls
near them (`lazy.jsx`). All of them respect the visitor's reduced-motion setting.

To update a component, copy the new file over the old one from the same folder in the React Bits repository.
