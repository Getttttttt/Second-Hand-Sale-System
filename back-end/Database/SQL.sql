CREATE DATABASE secondhandsalesysytem ON
(
NAME = secondhandsalesystem,
FILENAME = 'D:\Project\SecondHandSystem\SecondHandDatabase\secondhandsalesystem.mdf',
SIZE = 100MB, MAXSIZE = UNLIMITED, FILEGROWTH = 10MB
)
LOG ON
(
NAME = secondhandsalesystemlog,
FILENAME = 'D:\Project\SecondHandSystem\SecondHandDatabase\secondhandsalesystemlog.ldf',
SIZE = 100MB, MAXSIZE = UNLIMITED, FILEGROWTH = 10MB
)

use secondhandsalesysytem
GO


CREATE TABLE [订单] (
  [用户ID] char(10) NOT NULL,
  [商品ID] char(10) NOT NULL,
  [交易时间] datetime2 NOT NULL,
  [交易价格] float NULL,
  [交易数量] int NULL,
  [交易状态] char(20) NULL,
  CONSTRAINT [_copy_9] PRIMARY KEY CLUSTERED ([用户ID], [商品ID])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)
GO

CREATE TABLE [沟通记录] (
  [商家id] char(10) NOT NULL,
  [用户id] char(10) NOT NULL,
  [沟通时间] time NOT NULL,
  [会话内容] char(200) NULL,
  CONSTRAINT [_copy_6] PRIMARY KEY CLUSTERED ([商家id], [用户id], [沟通时间])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)
GO

CREATE TABLE [商家] (
  [商家id] char(10) NOT NULL,
  [昵称] char(100) NULL,
  [登录密码] char(20) NULL,
  [信用等级] char(10) NULL,
  [在售书籍数量] int NULL,
  [开店时长] int NULL,
  [头像] char(100) NULL,
  CONSTRAINT [_copy_18] PRIMARY KEY CLUSTERED ([商家id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)
GO

CREATE TABLE [售卖书籍] (
  [商品id] char(10) NOT NULL,
  [商家id] char(10) NOT NULL,
  [库存数量] int NULL,
  [上架时间] char(20) NULL,
  [新旧程度] char(100) NULL,
  CONSTRAINT [_copy_17] PRIMARY KEY CLUSTERED ([商品id], [商家id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)
GO

CREATE TABLE [图书] (
  [商品ID] char(10) NOT NULL,
  [商品名称] char(100) NOT NULL,
  [商品价格] float NULL,
  [商品折扣] float NULL,
  [库存数量] int NULL,
  [作者名称] char(100) NULL,
  [ISBN] char(30) NULL,
  [出版社] char(100) NULL,
  [出版时间] date NULL,
  [商品封面] char(100) NULL,
  [新旧程度] char(20) NULL,
  [上架时间] date NULL,
  CONSTRAINT [_copy_15] PRIMARY KEY CLUSTERED ([商品ID])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)
GO

CREATE TABLE [图书分类] (
  [商品ID] char(10) NOT NULL,
  [分类类型] char(20) NOT NULL,
  CONSTRAINT [_copy_14] PRIMARY KEY CLUSTERED ([商品ID], [分类类型])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)
GO

CREATE TABLE [图书评价] (
  [商品ID] char(10) NOT NULL,
  [用户ID] char(10) NOT NULL,
  [评价等级] int NOT NULL,
  [评价言论] char(200) NULL,
  CONSTRAINT [_copy_16] PRIMARY KEY CLUSTERED ([商品ID], [用户ID])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)
GO

CREATE TABLE [图书示例图片] (
  [商品ID] char(10) NOT NULL,
  [商品图片展示URL] char(100) NOT NULL,
  CONSTRAINT [_copy_13] PRIMARY KEY CLUSTERED ([商品ID], [商品图片展示URL])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)
GO

CREATE TABLE [用户] (
  [用户id] char(10) NOT NULL,
  [昵称] char(100) NULL,
  [登录密码] char(20) NOT NULL,
  [手机号] int NULL,
  [收货地址] char(100) NULL,
  [头像] char(100) NULL,
  PRIMARY KEY CLUSTERED ([用户id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)
GO

CREATE TABLE [购物车] (
  [用户id] char(10) NOT NULL,
  [商品id] char(10) NOT NULL,
  [加购数量] int NULL,
  CONSTRAINT [_copy_10] PRIMARY KEY CLUSTERED ([用户id], [商品id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)
GO

ALTER TABLE [订单] ADD CONSTRAINT [_copy_1] FOREIGN KEY ([商品ID]) REFERENCES [图书] ([商品ID])
GO
ALTER TABLE [订单] ADD CONSTRAINT [_copy_8] FOREIGN KEY ([用户ID]) REFERENCES [用户] ([用户id])
GO
ALTER TABLE [沟通记录] ADD CONSTRAINT [_copy_5] FOREIGN KEY ([用户id]) REFERENCES [用户] ([用户id])
GO
ALTER TABLE [沟通记录] ADD CONSTRAINT [_copy_2] FOREIGN KEY ([商家id]) REFERENCES [商家] ([商家id])
GO
ALTER TABLE [售卖书籍] ADD CONSTRAINT [ Copy 4] FOREIGN KEY ([商家id]) REFERENCES [商家] ([商家id])
GO
ALTER TABLE [售卖书籍] ADD CONSTRAINT [_copy_7] FOREIGN KEY ([商品id]) REFERENCES [图书] ([商品ID])
GO
ALTER TABLE [图书分类] ADD CONSTRAINT [ Copy 2] FOREIGN KEY ([商品ID]) REFERENCES [图书] ([商品ID])
GO
ALTER TABLE [图书评价] ADD CONSTRAINT [ Copy 1] FOREIGN KEY ([商品ID]) REFERENCES [图书] ([商品ID])
GO
ALTER TABLE [图书评价] ADD CONSTRAINT [_copy_3] FOREIGN KEY ([用户ID]) REFERENCES [用户] ([用户id])
GO
ALTER TABLE [图书示例图片] ADD CONSTRAINT [商品ID] FOREIGN KEY ([商品ID]) REFERENCES [图书] ([商品ID])
GO
ALTER TABLE [购物车] ADD CONSTRAINT [ Copy 5] FOREIGN KEY ([用户id]) REFERENCES [用户] ([用户id])
GO
ALTER TABLE [购物车] ADD CONSTRAINT [_copy_4] FOREIGN KEY ([商品id]) REFERENCES [图书] ([商品ID])
GO

