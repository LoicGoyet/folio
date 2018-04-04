import { injectGlobal } from 'styled-components';

injectGlobal`
    body {
        margin: 0;
    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }
`;
