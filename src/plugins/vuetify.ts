import Vue from 'vue';
import colors from 'vuetify/es5/util/colors';
import Vuetify from 'vuetify/lib';

import 'vuetify/src/stylus/app.styl';

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: colors.blue.base,
    secondary: colors.cyan.base,
    accent: colors.indigo.base,
  },
});
