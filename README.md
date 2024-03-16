# Overlay

This repository contains my personal stream overlay for use with OBS or similar streaming software.

## Features

- **Scenes**: 
  - Starting
  - In-game
  - Away
  - Ending
- **Retro Achievements Tracker**: Integrates with [Retro Achievements](https://retroachievements.org/) to display:
  - Game information
  - Next achievement
  - Last achieved

## Running

1. **Install Deno**: Ensure you have [Deno](https://deno.land/) installed (tested with `deno 1.40.5`).
2. **Configure Environment**: Copy the example `.env` file:

    ```bash
    cp .env.sample .env
    ```

    Fill in your Retro Achievements information:
    
    - `RA_USER_NAME`: Your Retro Achievements username
    - `RA_WEB_API_KEY`: Obtain from [here](https://retroachievements.org/controlpanel.php)

3. **Run**: Execute `$ deno task run`.
4. **Add Browser Overlays to OBS**: Use the following routes:
   - `/starting`
   - `/ingame`
   - `/away`
   - `/ending`

5. **Control Tracked Game**: Access the `/` route to control the currently tracked game.

## Unlicense (Public Domain)

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or distribute this
software, either in source code form or as a compiled binary, for any purpose,
commercial or non-commercial, and by any means.

In jurisdictions that recognize copyright laws, the author or authors of this
software dedicate any and all copyright interest in the software to the public
domain. We make this dedication for the benefit of the public at large and to
the detriment of our heirs and successors. We intend this dedication to be an
overt act of relinquishment in perpetuity of all present and future rights to
this software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to &lt;<http://unlicense.org/>&gt;