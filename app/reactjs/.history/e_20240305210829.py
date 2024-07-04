import pygame
import random
import numpy as np

pygame.init()

# Paramètres de base
SCREEN_WIDTH = 300
SCREEN_HEIGHT = 600
BLOCK_SIZE = 30
FPS = 30
COLOR_CHANGE_FREQUENCY = 1000  # changer de couleur toutes les 1000 frames

# Couleurs de l'arc-en-ciel
RAINBOW_COLORS = [
    (255, 0, 0),     # Rouge
    (255, 165, 0),   # Orange
    (255, 255, 0),   # Jaune
    (0, 255, 0),     # Vert
    (0, 0, 255),     # Bleu
    (75, 0, 130),    # Indigo
    (148, 0, 211)    # Violet
]

# Définition des formes de Tetris avec leurs couleurs correspondantes
tetris_shapes = [
    [[1, 1, 1],
     [0, 1, 0]],  # L
    [[0, 2, 2],
     [2, 2, 0]],  # S
    [[3, 3, 0],
     [0, 3, 3]],  # Z
    [[4, 0, 0],
     [4, 4, 4]],  # T
    [[0, 0, 5],
     [5, 5, 5]],  # J
    [[6, 6, 6, 6]],  # I
    [[7, 7],
     [7, 7]]  # O
]

# Couleurs correspondantes aux formes de Tetris
tetris_colors = [
    (0, 0, 0),   # Noir
    (255, 0, 0), # Rouge
    (0, 255, 0), # Vert
    (0, 0, 255), # Bleu
    (255, 255, 0), # Jaune
    (255, 165, 0), # Orange
    (75, 0, 130),  # Indigo
    (148, 0, 211)  # Violet
]

def draw_matrix(matrix, offset):
    for y, row in enumerate(matrix):
        for x, val in enumerate(row):
            if val:
                pygame.draw.rect(screen, tetris_colors[val], pygame.Rect((offset[0] + x) * BLOCK_SIZE, (offset[1] + y) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE), 0)

def new_piece():
    shape = random.choice(tetris_shapes)
    piece = {}
    piece['shape'] = shape
    piece['color'] = tetris_colors[tetris_shapes.index(shape)]
    piece['x'] = SCREEN_WIDTH // 2 - len(shape[0]) // 2
    piece['y'] = 0
    return piece

def check_collision(board, piece, offset):
    off_x, off_y = offset
    for y, row in enumerate(piece):
        for x, val in enumerate(row):
            if val:
                if y + piece['y'] + off_y >= len(board) or \
                   x + piece['x'] + off_x < 0 or \
                   x + piece['x'] + off_x >= len(board[0]) or \
                   board[y + piece['y'] + off_y][x + piece['x'] + off_x]:
                    return True
    return False

def rotate(piece):
    rotated_shape = np.rot90(piece['shape'])
    return rotated_shape.tolist()

def remove_row(board, row):
    del board[row]
    return [[0 for _ in range(SCREEN_WIDTH // BLOCK_SIZE)]] + board, 1

def join_matrixes(board, piece, offset):
    off_x, off_y = offset
    for y, row in enumerate(piece):
        for x, val in enumerate(row):
            if val:
                board[y + piece['y'] + off_y][x + piece['x'] + off_x] = val
    return board

def main():
    board = [[0 for _ in range(SCREEN_WIDTH // BLOCK_SIZE)] for _ in range(SCREEN_HEIGHT // BLOCK_SIZE)]

    piece = new_piece()
    game_over = False
    score = 0
    frame_count = 0
    current_color_index = 0

    # Initialisation de l'écran avec une couleur de l'arc-en-ciel
    screen.fill(RAINBOW_COLORS[current_color_index])

    while not game_over:
        # Mise à jour de l'affichage de l'écran
        pygame.display.update()

        # Gestion des événements
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                game_over = True

        # Logique du jeu ici...

        # Incrémenter le compteur de frames
        frame_count += 1

        # Changer la couleur de l'arrière-plan toutes les COLOR_CHANGE_FREQUENCY frames
        if frame_count >= COLOR_CHANGE_FREQUENCY:
            frame_count = 0
            current_color_index = (current_color_index + 1) % len(RAINBOW_COLORS)
            screen.fill(RAINBOW_COLORS[current_color_index])

    pygame.quit()

def remove_completed_lines(board):
    lines_removed = 0
    new_board = []
    for row in range(len(board)):
        if not all(board[row]):
            new_board.append(board[row])
        else:
            lines_removed += 1
    for _ in range(lines_removed):
        new_board.insert(0, [0 for _ in range(SCREEN_WIDTH // BLOCK_SIZE)])
    return new_board, lines_removed

if _name_ == '_main_':
    screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
    clock = pygame.time.Clock()
    main()