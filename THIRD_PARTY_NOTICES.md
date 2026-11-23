# Fraunces

The header name uses a self-hosted Latin subset of Fraunces Regular, instantiated
at weight 400 and optical size 32 from the official Google Fonts source. It is
licensed under the SIL Open Font License 1.1; the complete license and copyright
notice are included in `public/fonts/Fraunces-OFL.txt`.

# dithercn

The shader engine under `src/lib/dither/` and examples under
`src/components/dithercn/` originate from https://github.com/opencoredev/dithercn,
downloaded from the official registry on 2026-11-23. The selection logic,
theme integration, and capped grid sizing are local additions. The engine's
`toSorted` and example `toReversed` calls were adapted for the app's ES2022 target.
Local refinements add Ripple ring-width control, a Waves glow control and gentler
wave profiles and curved static swells, and remove the Fire fallback's glow ellipse.
Shader initialization also releases partially created resources on failure.

MIT License

Copyright (c) 2026 Leo

Copyright (c) 2026 Shadcn Labs (startercn, which this project is based on)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
