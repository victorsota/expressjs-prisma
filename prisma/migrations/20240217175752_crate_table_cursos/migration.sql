-- CreateTable
CREATE TABLE "Curso" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAbertura" TIMESTAMP(3) NOT NULL,
    "vagas" INTEGER NOT NULL,
    "modalidade" TEXT NOT NULL,
    "nomeCurso" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);
