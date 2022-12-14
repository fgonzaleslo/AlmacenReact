USE [PRUEBAMARTES]
GO
/****** Object:  Table [dbo].[ALMACEN]    Script Date: 11/08/2022 9:33:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ALMACEN](
	[IdAlmacen] [int] IDENTITY(1,1) NOT NULL,
	[NombreAlmacen] [nvarchar](255) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PRODUCTO]    Script Date: 11/08/2022 9:33:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PRODUCTO](
	[IdProducto] [int] IDENTITY(1,1) NOT NULL,
	[NombreProducto] [nvarchar](255) NULL,
	[Almacen] [nvarchar](255) NULL,
	[FechaIngreso] [datetime] NULL,
	[FotoProducto] [nvarchar](500) NULL
) ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[lista_almacen]    Script Date: 11/08/2022 9:33:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[lista_almacen] 
as 
begin
select IdAlmacen, NombreAlmacen from dbo.ALMACEN
end
GO
/****** Object:  StoredProcedure [dbo].[lista_producto]    Script Date: 11/08/2022 9:33:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[lista_producto] 
as
begin
select IdProducto, NombreProducto, Almacen, convert(varchar(10),FechaIngreso,120) as FechaIngreso,FotoProducto from dbo.PRODUCTO
end
GO
/****** Object:  StoredProcedure [dbo].[modificar_almacen]    Script Date: 11/08/2022 9:33:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[modificar_almacen](
@idAlmacen int,
@nombreAlmacen varchar(255)
)
as
begin

update dbo.ALMACEN set 
NombreAlmacen = @nombreAlmacen
where IdAlmacen = @idAlmacen

end
GO
/****** Object:  StoredProcedure [dbo].[registro_almacen]    Script Date: 11/08/2022 9:33:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[registro_almacen](
@nombreAlmacen nvarchar(255)
)
as
begin

insert into dbo.ALMACEN(NombreAlmacen)
values
(
@nombreAlmacen
)
end
GO
