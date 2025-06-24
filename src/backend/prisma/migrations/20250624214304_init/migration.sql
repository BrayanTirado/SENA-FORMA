-- CreateEnum
CREATE TYPE "TipoDocumento" AS ENUM ('CC', 'TI', 'CE', 'PP');

-- CreateEnum
CREATE TYPE "Genero" AS ENUM ('Masculino', 'Femenino', 'Otro', 'Prefiero_no_decir');

-- CreateEnum
CREATE TYPE "NivelAcademico" AS ENUM ('Primaria', 'Bachiller', 'Técnico', 'Tecnólogo', 'Profesional', 'Posgrado', 'Ninguno');

-- CreateEnum
CREATE TYPE "Discapacidad" AS ENUM ('Ninguna', 'Física', 'Sensorial', 'Cognitiva', 'Psicosocial', 'Múltiple');

-- CreateEnum
CREATE TYPE "GrupoEtnico" AS ENUM ('Ninguno', 'Indígena', 'Afrocolombiano', 'Raizal', 'Palenquero', 'Rom');

-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('coordinador', 'instructor', 'aprendiz');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombres" VARCHAR(100) NOT NULL,
    "apellidos" VARCHAR(100) NOT NULL,
    "tipo_documento" "TipoDocumento" NOT NULL,
    "numero_documento" VARCHAR(30) NOT NULL,
    "fecha_nacimiento" DATE NOT NULL,
    "genero" "Genero",
    "telefono" VARCHAR(20) NOT NULL,
    "direccion" VARCHAR(150),
    "ciudad_residencia" VARCHAR(100),
    "departamento" VARCHAR(100),
    "nivel_academico" "NivelAcademico",
    "titulo_profesional" VARCHAR(100),
    "experiencia_anios" INTEGER,
    "certificaciones" TEXT,
    "eps" VARCHAR(100),
    "discapacidad" "Discapacidad",
    "grupo_etnico" "GrupoEtnico",
    "sisben" VARCHAR(20),
    "estrato" INTEGER,
    "correo" VARCHAR(100) NOT NULL,
    "contrasena" VARCHAR(255) NOT NULL,
    "rol" "Rol" NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Programa" (
    "id" SERIAL NOT NULL,
    "codigo" VARCHAR(20) NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "tipo_formacion" VARCHAR(50) NOT NULL,
    "nivel_formacion" VARCHAR(50) NOT NULL,
    "area_formacion" VARCHAR(100),
    "modalidad" VARCHAR(50) NOT NULL,
    "duracion" INTEGER NOT NULL,
    "requisitos_ingreso" TEXT,
    "competencias" TEXT,
    "perfil_egresado" TEXT,
    "estado" VARCHAR(20) NOT NULL DEFAULT 'activo',
    "version" INTEGER NOT NULL DEFAULT 1,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Programa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ficha" (
    "id" SERIAL NOT NULL,
    "codigo" VARCHAR(20) NOT NULL,
    "programaId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "coordinadorId" INTEGER,
    "modalidad" VARCHAR(50) NOT NULL,
    "jornada" VARCHAR(50) NOT NULL,
    "duracion" INTEGER NOT NULL,
    "cupos" INTEGER NOT NULL,
    "centro_formacion" VARCHAR(100) NOT NULL,
    "regional" VARCHAR(100) NOT NULL,
    "empresa" VARCHAR(100),
    "estado" VARCHAR(20) NOT NULL,
    "fecha_creacion" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_aprobacion" DATE,
    "fecha_inicio" DATE NOT NULL,
    "fecha_fin" DATE NOT NULL,
    "observaciones" TEXT,

    CONSTRAINT "Ficha_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inscripcion" (
    "id" SERIAL NOT NULL,
    "fichaId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "fecha_inscripcion" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" VARCHAR(20) NOT NULL DEFAULT 'inscrito',

    CONSTRAINT "Inscripcion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_numero_documento_key" ON "Usuario"("numero_documento");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "Programa_codigo_key" ON "Programa"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Ficha_codigo_key" ON "Ficha"("codigo");

-- AddForeignKey
ALTER TABLE "Ficha" ADD CONSTRAINT "Ficha_programaId_fkey" FOREIGN KEY ("programaId") REFERENCES "Programa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ficha" ADD CONSTRAINT "Ficha_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ficha" ADD CONSTRAINT "Ficha_coordinadorId_fkey" FOREIGN KEY ("coordinadorId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscripcion" ADD CONSTRAINT "Inscripcion_fichaId_fkey" FOREIGN KEY ("fichaId") REFERENCES "Ficha"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscripcion" ADD CONSTRAINT "Inscripcion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
