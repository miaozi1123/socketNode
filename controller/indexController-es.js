"use strict";
const indexController = {
    index() {
        return async(ctx, next) => {
            ctx.body = await ctx.render('index.html', {
                title: '聊天室'
            });
        }
    }
};

export
default indexController;