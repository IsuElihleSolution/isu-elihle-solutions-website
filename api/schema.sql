-- Run once against your Azure SQL database to create the Orders table.
IF OBJECT_ID('dbo.Orders', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.Orders (
        id              BIGINT          IDENTITY(1,1) PRIMARY KEY,
        reference       NVARCHAR(50)    NOT NULL UNIQUE,
        firstName       NVARCHAR(100)   NOT NULL,
        lastName        NVARCHAR(100)   NOT NULL,
        email           NVARCHAR(200)   NOT NULL,
        phone           NVARCHAR(30)    NOT NULL,
        idNumber        NVARCHAR(30)    NULL,
        address         NVARCHAR(300)   NOT NULL,
        suburb          NVARCHAR(100)   NULL,
        city            NVARCHAR(100)   NOT NULL,
        province        NVARCHAR(50)    NOT NULL,
        service         NVARCHAR(30)    NOT NULL,
        plan            NVARCHAR(50)    NOT NULL,
        installation    NVARCHAR(30)    NOT NULL DEFAULT 'standard',
        notes           NVARCHAR(MAX)   NULL,
        status          NVARCHAR(30)    NOT NULL DEFAULT 'received',
        createdAt       DATETIME2(0)    NOT NULL DEFAULT SYSUTCDATETIME()
    );

    CREATE INDEX IX_Orders_email ON dbo.Orders(email);
    CREATE INDEX IX_Orders_createdAt ON dbo.Orders(createdAt DESC);
END;
