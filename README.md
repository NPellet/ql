## How to get the code

`
git clone git@github.com:NPellet/ql.git
`

## How to build ?

In a terminal, open the folder and type
`
cd ql/docker
docker compose build
`

This will start the build (takes a few minutes)

## How to start ?

In the same folder, type

`
cd ql/docker
docker compose up
`

And browse to http://localhost:3000

## How to change the images ?

They are stored in `./images`. First folder is the name the tray (e.g. `./images/1`), and then you need 2 subfolders: `control` and `trial`.

You can create as many trays as you want and place as many `png` files as you want in it. Other files are ignored.

During the trial run, 8 of those images will be randmonly selected
